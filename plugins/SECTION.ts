import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import CHORD from "~/plugins/CHORD";
import TIME, { TIME_TOKEN } from "./TIME";
import CLEF, { CLEF_TOKEN } from "./CLEF";
import KEY, { KEY_TOKEN } from "./KEY";
import TEMPO, { TEMPO_TOKEN } from "./TEMPO";
import NODE from "~/plugins/NODE";

class SECTION extends STATEMENT {

  chords: Array<CHORD> = [];
  clef: CLEF;
  key: KEY;
  name: string;
  tempo: TEMPO;
  time: TIME;
  total_duration: number = 0;
  xml: string = '';

  parse(): void {
    this.name = tokenizer.get_next_token();
    tokenizer.get_and_check_next('<-\\s*{');

    while (!tokenizer.check_next_token('}')) {
      console.log(tokenizer.get_cur_token());
      if (tokenizer.check_next_token(CLEF_TOKEN)) {
        this.clef = new CLEF();
        this.clef.parse();
      }
      // key
      else if (tokenizer.check_next_token(KEY_TOKEN)) {
        this.key = new KEY();
        this.key.parse();
      }
      // time
      else if (tokenizer.check_next_token(TIME_TOKEN)) {
        this.time = new TIME();
        this.time.parse();
      }
      // tempo
      else if (tokenizer.check_next_token(TEMPO_TOKEN)) {
        this.tempo = new TEMPO();
        this.tempo.parse();
      }
      // chord
      else if (tokenizer.is_next_token_note() || tokenizer.is_next_token_rest()) {
        let chord: CHORD = new CHORD();
        chord.parse();
        this.chords.push(chord);
      }
      else {
        tokenizer.get_next_token()
        let first = tokenizer.get_cur_token().split(' ')[0]
        throw new Error('Section not supported: '+first);
      }
    }

    tokenizer.get_next_token();
  }

  evaluate(): void {
    let measure_number = 0;
    let measure_duration = 0;
    let i = 0;

    this.xml += `<part id="${this.name}">\n`;

    this.create_new_measure(measure_number++);

    while (i < this.chords.length) {
      if (measure_duration === 128 * this.time.get_beats()) {
        this.xml += '</measure>\n';
        this.create_new_measure(measure_number++);
        measure_duration = 0;
      } else if (measure_duration > 128 * this.time.get_beats()) {
        throw new Error('Invalid durations: Not enough beats in a bar');
      }

      this.chords[i].evaluate();
      this.xml += this.chords[i].get_xml();
      measure_duration += this.chords[i].get_duration();
      this.total_duration += this.chords[i].get_duration();
      i++;
    }

    if (measure_duration !== 128 * this.time.get_beats())
      throw new Error('Invalid durations: Too many beats in a bar');

    this.xml += '</measure>\n';
    this.xml += '</part>\n';
    NODE.section_names.push(this.name);

    NODE.section_durations.set(this.name, this.total_duration);

    NODE.xml.set(this.name, this.xml);
    NODE.sections.set(this.name, this);
  }

  create_new_measure(measure_number: number) {
    this.xml += `<measure number = "${measure_number}">\n`;

    if (this.tempo && measure_number === 0) {
      this.tempo.evaluate();
      this.xml += this.tempo.get_xml();
    }

    this.xml += '<attributes>\n';
    this.xml += '<divisions>128</divisions>\n';

    this.key.evaluate();
    this.xml += this.key.get_xml();

    this.time.evaluate();
    this.xml += this.time.get_xml();

    this.clef.evaluate();
    this.xml += this.clef.get_xml();
    this.xml += '</attributes>\n';
  }

  get_clef(): CLEF {
    return this.clef;
  }

  get_key(): KEY {
    return this.key;
  }

  get_time(): TIME {
    return this.time;
  }

  get_total_duration(): number {
    return this.total_duration;
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

export default SECTION;
