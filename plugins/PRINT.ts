import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import NODE from "~/plugins/NODE";
import SECTION from "~/plugins/SECTION";
import REPEAT from "~/plugins/REPEAT";

class PRINT extends STATEMENT {

  section_names: Array<Array<string>> = [];
  sections: Array<Array<SECTION>> = [];
  xml: string = '';

  parse(): void {
    tokenizer.get_and_check_next('PRINT');
    tokenizer.get_and_check_next('->\\s*{');

    while (!tokenizer.check_next_token('}')) {
      if (tokenizer.check_next_token('REPEAT')) {
        let repeat: REPEAT = new REPEAT();
        repeat.parse();
        this.section_names = this.section_names.concat(repeat.get_sections());

      } else {
        let stacked = [];
        while (!tokenizer.check_next_token('!!!')) {
          stacked.push(tokenizer.get_next_token());
        }
        tokenizer.get_next_token();
        this.section_names.push(stacked);
      }
    }

    tokenizer.get_next_token();
  }

  evaluate(): void {
    this.sections = this.section_names.map(section_name => {
      return section_name.map(s => {
        return NODE.sections.get(s);
      })
    });

    this.xml += '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
    this.xml += '<!DOCTYPE score-partwise PUBLIC\n' +
      '    "-//Recordare//DTD Music XML 3.1 Partwise//EN"\n' +
      '    "http://www.musicxml.org/dtds/partwise.dtd">\n';

    this.xml += '<score-partwise version="3.1">\n';

    this.xml += NODE.title;

    this.xml += '<part-list>\n';
    this.xml += `<score-part id="1">\n`;
    this.xml += `<part-name>1</part-name>\n`;
    this.xml += '</score-part>\n';
    this.xml += '</part-list>\n';

    this.xml += '<part id="1">\n';

    for (let i = 0; i < this.sections.length; i++) {
      this.xml += this.merge_sections(this.sections[i], i);
    }

    this.xml += '</part>\n';

    this.xml += '</score-partwise>\n';
  }

  merge_sections(sections: Array<SECTION>, index: number): string {
    let xml: string = '';

    sections = sections.sort((section1, section2) => {
      return section1.get_clef().get_comparator() - section2.get_clef().get_comparator();
    });

    let measures = sections.map(section => {
      return section.get_xml().match(/<measure.*>([\s\S]*?)<\/measure>/g);
    });


    for (let i = 0; i < measures[0].length; i++) {
      xml += `<measure number="${i}">\n`;

      if (index === 0) {
        xml += '<attributes>\n';
        xml += '<divisions>128</divisions>\n';
        xml += sections[0].get_key().get_xml();
        xml += sections[0].get_time().get_xml();
        xml += `<staves>${sections.length}</staves>\n`;

        for (let clef_index = 0; clef_index < sections.length; clef_index++) {
          let clef = sections[clef_index].get_clef().get_xml();
          clef = clef.replace('<clef>\n', `<clef number="${clef_index + 1}">\n`);
          xml += clef;
        }

        xml += '</attributes>\n';
      }

      let last_duration = undefined;

      for (let measure_index = 0; measure_index < measures.length; measure_index++) {
        let measure = measures[measure_index][i];

        // let notes = measure.match(/<note.*>([\s\S]*?)<\/note>/g);
        let notes = measure.match(/(<note.*>([\s\S]*?)<\/note>)|(<direction.*>([\s\S]*?)<\/direction>)/g);
        notes = notes.map(note => {
          let voices = note.match(/<voice.*>([\s\S]*?)<\/voice>/g);
          if (voices) {
            let voice = voices[0];
            note.replace(voice, `<voice>${measure_index + 1}</voice>`);
            return note.replace('</voice>\n', `</voice>\n<staff>${measure_index + 1}</staff>\n`);
          } else
            return note;
        });


        for (let note of notes) {
          if (last_duration) {
            xml += '<backup>\n';
            xml += `<duration>${last_duration}</duration>\n`;
            xml += '</backup>\n';
          }

          xml += note;
          xml += '\n';

          let durations = note.match(/<duration>\d+<\/duration>/g);
          if (durations) {
            let duration = durations[0];
            last_duration = duration.match(/\d+/g)[0];
          }
        }
      }

      xml += '</measure>\n';
    }

    return xml;
  }

  get_xml(): string {
    return this.xml;
  }

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

  support_check(): void { }

}

export default PRINT;