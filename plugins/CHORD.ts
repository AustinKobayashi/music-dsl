import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import NOTE from "~/plugins/NOTE";
import DYNAMIC from "~/plugins/DYNAMIC";
import DURATION from "~/plugins/DURATION";
import ARTICULATION from "~/plugins/ARTICULATION";

class CHORD extends STATEMENT {

  articulation: ARTICULATION;
  duration: DURATION;
  dynamic: DYNAMIC;
  notes: Array<NOTE> = [];

  xml: string = '';

  parse(): void {
    let note: NOTE = new NOTE();
    note.parse();
    this.notes.push(note);

    while (tokenizer.is_next_token_note()) {
      let note: NOTE = new NOTE();
      note.parse();
      this.notes.push(note);
    }

    while (!tokenizer.check_next_token('}') && !tokenizer.is_next_token_note()) {
      if (tokenizer.is_next_token_duration()) {
        // duration
        this.duration = new DURATION();
        this.duration.parse();

      } else if (tokenizer.is_next_token_articulation()) {
        // articulation
        this.articulation = new ARTICULATION();
        this.articulation.parse();

      } else if (tokenizer.is_next_token_dynamic()) {
        this.dynamic = new DYNAMIC();
        this.dynamic.parse();

      } else if (!tokenizer.check_token('}')) {
        // console.log(tokenizer.get_cur_token());
        throw new Error('Invalid chord');
      }
    }
  }

  evaluate(): void {
    this.duration.evaluate();

    if (this.dynamic) {
      this.dynamic.evaluate();
      this.xml += this.dynamic.get_xml();
    }

    if (this.articulation)
      this.articulation.evaluate();

    for (let i = 0; i < this.notes.length; i++) {
      if (i > 0)
        this.notes[i].set_is_chord(true);

      this.notes[i].set_duration(this.duration.get_xml());

      if (this.articulation)
        this.notes[i].set_articulation(this.articulation.get_xml());

      this.notes[i].evaluate();
      this.xml += this.notes[i].get_xml();
    }
  }

  get_xml(): string {
    return this.xml;
  }

  get_duration(): number {
    return this.duration.get_duration();
  }

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

  support_check(): void { }

}

export default CHORD;