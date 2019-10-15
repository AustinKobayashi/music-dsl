import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import NOTE from "~/plugins/NOTE";
import DYNAMIC from "~/plugins/DYNAMIC";
import DURATION from "~/plugins/DURATION";
import ARTICULATION from "~/plugins/ARTICULATION";

class CHORD extends STATEMENT {

  articulation: ARTICULATION;
  dynamic: DYNAMIC;
  duration: DURATION;
  is_rest: boolean;
  notes: Array<NOTE> = [];
  xml: string = '';

  parse(): void {
    if (tokenizer.is_next_token_note())
      this.parse_chord();
    else
      this.parse_rest();
  }

  parse_rest(): void {
    tokenizer.get_and_check_next('REST');
    this.duration = new DURATION();
    this.duration.parse();

    this.is_rest = true;
  }

  parse_chord(): void {
    let note: NOTE = new NOTE();
    note.parse();
    this.notes.push(note);

    while (tokenizer.is_next_token_note()) {
      let note: NOTE = new NOTE();
      note.parse();
      this.notes.push(note);
    }

    while (!tokenizer.check_next_token('}') && !tokenizer.is_next_token_note() && !tokenizer.is_next_token_rest()) {
      // duration
      if (tokenizer.is_next_token_duration()) {
        this.duration = new DURATION();
        this.duration.parse();
      }
      // articulation
      else if (tokenizer.is_next_token_articulation()) {
        this.articulation = new ARTICULATION();
        this.articulation.parse();
      }
      // dynamic
      else if (tokenizer.is_next_token_dynamic()) {
        this.dynamic = new DYNAMIC();
        this.dynamic.parse();
      }
      else if (!tokenizer.check_token('}')) {
        throw new Error('Invalid chord, unexpected symbol: ' + tokenizer.get_next_token());
      }
    }
  }

  evaluate(): void {
    if (!this.is_rest)
      this.evaluate_chord();
    else
      this.evaluate_rest();
  }

  evaluate_rest(): void {
    this.duration.evaluate();

    this.xml += '<note>\n';
    this.xml += '<rest/>\n';
    this.xml += this.duration.get_xml();
    this.xml += '</note>\n';
  }

  evaluate_chord(): void {
    this.duration.evaluate();

    if (this.dynamic) {
      this.dynamic.evaluate();
      this.xml += this.dynamic.get_xml();
    }

    if (this.articulation)
      this.articulation.evaluate();

    for (let i = 0; i < this.notes.length; i++) {
      if (i > 0) {
        this.notes[i].set_is_chord(true);
      }
      this.notes[i].set_duration(this.duration.get_xml());

      if (this.articulation)
        this.notes[i].set_articulation(this.articulation.get_xml());

      this.notes[i].evaluate();
      this.xml += this.notes[i].get_xml();
    }
  }

  get_duration(): number {
    return this.duration.get_duration();
  }

  get_duration_string(): string {
    return this.duration.get_name();
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

export default CHORD;
