const durations = ['whole', 'half', 'quarter', 'eighth', 'sixteenth', 'thirty-second', 'sixty-fourth', 'hundred twenty-eighth'];

const articulation = ['staccato', 'tenuto', 'marcato', 'begin slur', 'end slur'];

const dynamics = ['begin ppp', 'end ppp', 'begin pp', 'end pp', 'begin p', 'end p', 'begin mp', 'end mp', 'begin mf', 'end mf',
    'begin f', 'end f', 'begin ff', 'end f', 'begin fff', 'end fff', 'begin crescendo', 'end crescendo', 'begin decrescendo',
    'end decrescendo', 'begin diminuendo', 'end diminuendo'];



const tokenizer = {

    tokenize_title (title_str: string) {
        return title_str.split('TITLE ')[1];
    },


    tokenize_section (section_str: string) {
        let parts = section_str.split('\n');
        const title = parts[0].replace(/\s*<-\s*{/g, '').trim();

        parts.splice(0, 1);
        parts.splice(parts.length - 1, 1);

        let section = { 'chords': [] };

        for (let part of parts) {
            part = part.trim();
            if (part.startsWith('CLEF'))
                section['clef'] = part.replace('CLEF', '').trim();

            else if (part.startsWith('KEY'))
                section['key'] = part.replace('KEY', '').trim();

            else if (part.startsWith('TIME'))
                section['time'] = part.replace('TIME', '').trim();

            else if (part.startsWith('TEMPO'))
                section['tempo'] = part.replace('TEMPO', '').trim();

            else if(part.length > 0) {
                let chord_parts = part.split(',');
                let chord  = { 'notes':  []  };

                for (let chord_part of chord_parts) {
                    chord_part = chord_part.trim();
                    if (/\d/.test(chord_part)) {
                        let note = {};
                        let note_parts = chord_part.replace(' ', '').split('');
                        note['pitch'] = note_parts[0];
                        note['octave'] = note_parts[1];
                        note['modifier'] = note_parts.length === 3 ? note_parts[2] : ''
                        chord['notes'].push(note);
                    } else if (durations.includes(chord_part)) {
                        chord['duration'] = chord_part;
                    } else if (articulation.includes(chord_part)) {
                        chord['articulation'] = chord_part;
                    } else if (dynamics.includes(chord_part)) {
                        chord['dynamics'] = chord_part;
                    }
                }

                section['chords'].push(chord);
            }
        }
        return  { title, section };
    },



    tokenize_sections (section_strs: Array<string>) {
        let sections = {};
        for (let section_str of section_strs) {
            let section = tokenizer.tokenize_section(section_str);
            sections[section['title']] = section['section'];
        }
        return sections;
    },



    tokenize_print (print_str: string) {
        let parts = print_str.split('\n');

        parts.splice(0, 1);
        parts.splice(parts.length - 1, 1);

        let print = [];
        for (const part of parts) {
            let repeat = {};
            let repeat_parts = part.split(' ');

            if (repeat_parts[0] === 'REPEAT') {
                repeat['count'] = parseInt(repeat_parts[repeat_parts.length - 1].trim(), 10);
                repeat_parts.splice(0, 1);
                repeat_parts.splice(repeat_parts.length - 1, 1);
            } else {
                repeat['count'] = 1;
            }

            repeat['sections'] = repeat_parts.map(repeat_part => {
                return repeat_part.replace(',', '').trim();
            });

            print.push(repeat)
        }

        return print;
    },



    tokenize (user_input: string) {
        const title_arr = user_input.match(/\s*\t*\n*TITLE.*/g) || [];
        const section_arr = user_input.match(/\w*\s<-[^}]*/g)  || [];
        const print_arr = user_input.match(/\w*PRINT[^}]*/g) || [];

        if (title_arr.length !== 1)
            throw new Error('Invalid Title');

        if (section_arr.length < 1)
            throw new Error('Invalid Sections');

        if (print_arr.length !== 1)
            throw new Error('Invalid Print');

        const title_str = title_arr[0];
        const section_strs = section_arr.map(section => {
            return section + '}';
        });
        const print_str = print_arr[0] + '}';

        let tokens = {};

        tokens['title'] = tokenizer.tokenize_title(title_str);
        tokens['sections'] = tokenizer.tokenize_sections(section_strs);
        tokens['print'] = tokenizer.tokenize_print(print_str);

        return tokens;
    }
};

export default tokenizer;