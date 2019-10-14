const durations = ['whole', 'half', 'quarter', 'eighth', 'sixteenth', 'thirty-second', 'sixty-fourth', 'hundred twenty-eighth'];

const articulations = ['staccato', 'tenuto', 'marcato', 'accent', 'begin slur', 'end slur'];

const dynamics = ['ppp', 'pp', 'p', 'mp', 'mf', 'fp', 'fz', 'rf', 'rfz', 'sf', 'f', 'ff', 'fff'];

const directions = ['begin crescendo', 'end crescendo', 'begin decrescendo', 'end decrescendo',
    'begin diminuendo', 'end diminuendo'];

const literals = ['TITLE', '<-{', '<- {', '}', 'CLEF', 'KEY', 'major', 'minor', 'TIME', '/', 'TEMPO', 'PRINT', 'REPEAT'];

class tokenizer {


    static tokens: Array<string> = [];
    static pointer: number = 0;


    public static get_and_check_next (regexp: string): string {
        let token: string = this.get_next_token();
        if (!this.check_token(regexp))
            throw new Error(`Token check failed for ${regexp}`);
        return token;
    }

    public static check_next_token (regexp: string): boolean {
        let token: string = this.tokens[this.pointer + 1];
        return RegExp(regexp, 'g').test(token);
    }

    public static check_token (regexp: string): boolean {
        let token: string = this.get_cur_token();
        return RegExp(regexp, 'g').test(token);
    }


    public static get_next_token (): string {
        this.pointer++;
        return this.tokens[this.pointer];
    }


    private static get_cur_token (): string {
        return this.tokens[this.pointer];
    }


    public static has_more_tokens (): boolean {
        if (this.tokens.length < 3)
            throw new Error('Not enough tokens');

        return this.pointer !== this.tokens.length;
    }



    public static is_next_token_note (): boolean {
        return RegExp('[(A-Z)|(a-z)]\\d(\\s*#|\\s*b)?', 'g').test(this.tokens[this.pointer + 1]);
    }

    public static is_next_token_duration(): boolean {
        return this.is_duration(this.tokens[this.pointer + 1]);
    }

    public static is_next_token_articulation(): boolean {
        return this.is_articulation(this.tokens[this.pointer + 1]);
    }

    public static is_next_token_dynamic(): boolean {
        return this.is_dynamic(this.tokens[this.pointer + 1]) ||
            this.is_direction(this.tokens[this.pointer + 1]);
    }

    public static is_next_token_quality(): boolean {
        return this.is_quality(this.tokens[this.pointer + 1]);
    }

    private static is_note (note: string): boolean {
        return RegExp('[(A-Z)|(a-z)](\\s*#|\\s*b)?\\d', 'g').test(note);
    }


    private static is_duration (duration: string): boolean {
        return durations.includes(duration);
    }

    private static is_articulation (articulation: string): boolean {
        return articulations.includes(articulation);
    }

    public static is_dynamic (dynamic: string): boolean {
        return dynamics.includes(dynamic);
    }

    public static is_direction (direction: string): boolean {
        return directions.includes(direction);
    }

    private static is_quality (quality: string): boolean {
        return quality === 'major' || quality === 'minor';
    }


    static tokenize (user_input: string): void {

        this.tokens.splice(0, this.tokens.length - 1);
        this.pointer = 0;

        let token_str = user_input;
        let repeats: Array<string> = token_str.match(/REPEAT.*/g) || [];

        for (let repeat of repeats) {
            let repeat_substr = repeat.match(/\s+\d+/g)[0];
            let digit = repeat_substr.match(/\d+/g)[0];

            let comma_repeat = repeat.replace(new RegExp(repeat_substr, 'g'), `, ${digit}`);
            token_str = token_str.replace(new RegExp(repeat, 'g'), comma_repeat);

        }

        token_str = token_str.replace(new RegExp('\n', 'g'), '_');

        for (const literal of literals)
            token_str = token_str.replace(new RegExp(literal, 'g'), `_${literal}_`);

        this.tokens = ['null_token'].concat(token_str.split('_').join(', ').split(', ').map(str => {
            return str.trim();
        }).filter(str => {
            return str !== '';
        }));
        console.log(this.tokens);
    }





    //========================================
    //      Old JSON Tokenizing Functions
    //========================================
    private static tokenize_title_for_json (title_str: string) {
        return title_str.split('TITLE ')[1];
    }


    private static tokenize_section_for_json (section_str: string) {
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

                        if (note_parts.length === 3)
                            note['modifier'] = note_parts[2];

                        chord['notes'].push(note);
                    } else if (durations.includes(chord_part)) {
                        chord['duration'] = chord_part;
                    } else if (articulations.includes(chord_part)) {
                        chord['articulations'] = chord_part;
                    } else if (dynamics.includes(chord_part)) {
                        chord['dynamics'] = chord_part;
                    }
                }

                section['chords'].push(chord);
            }
        }
        return  { title, section };
    }



    private static tokenize_sections_for_json (section_strs: Array<string>) {
        let sections = {};
        for (let section_str of section_strs) {
            let section = tokenizer.tokenize_section_for_json(section_str);
            sections[section['title']] = section['section'];
        }
        return sections;
    }



    private static tokenize_print_for_json (print_str: string) {
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
    }



    static tokenize_to_json (user_input: string) {
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

        tokens['title'] = tokenizer.tokenize_title_for_json(title_str);
        tokens['sections'] = tokenizer.tokenize_sections_for_json(section_strs);
        tokens['print'] = tokenizer.tokenize_print_for_json(print_str);

        return tokens;
    }
}

export default tokenizer;
