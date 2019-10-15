import STATEMENT from "./STATEMENT";
import NOTE from "./NOTE";
import tokenizer from "./tokenizer";
import QUALITY from "./QUALITY";

export const KEY_TOKEN = "KEY";
export const KEY_TO_FIFTHS = {
  "C minor": -3,
  "C major": 0,
  "D minor": -1,
  "D major": 2,
  "E minor": 1,
  "E major": 4,
  "F minor": -4,
  "F major": -1,
  "G minor": -2,
  "G major": 1,
  "A minor": 0,
  "A major": 3,
  "B minor": 2,
  "B major": 5,
  "C# minor": 4,
  "C# major": null,
  "D# minor": null,
  "D# major": null,
  "E# minor": null,
  "E# major": null,
  "F# minor": 3,
  "F# major": 6,
  "G# minor": 5,
  "G# major": null,
  "A# minor": null,
  "A# major": null,
  "B# minor": null,
  "B# major": null,
  "Cb minor": null,
  "Cb major": null,
  "Db minor": null,
  "Db major": -5,
  "Eb minor": -6,
  "Eb major": -3,
  "Ab minor": null,
  "Ab major": -4,
  "Bb minor": -5,
  "Bb major": -2
}

class KEY extends STATEMENT {

  note: NOTE;
  quality: QUALITY;
  xml: string;

  parse(): void {
    tokenizer.get_and_check_next(KEY_TOKEN);
    this.note = new NOTE();
    this.note.parse();
    this.quality = new QUALITY();
    this.quality.parse();
  }

  evaluate(): void {
    this.note.evaluate();
    let key = `${this.note.to_string()} ${this.quality.to_string()}`;

    this.xml = `<key>\n<fifths>${KEY_TO_FIFTHS[key]}</fifths>\n</key>\n`;
  }

  support_check(): void {
    let key = `${this.note.to_string()} ${this.quality.to_string()}`;
    if (!(key in KEY_TO_FIFTHS))
      throw new Error(`Invalid Key Signature: ${key}`);
  }

  get_xml(): string {
    return this.xml;
  }

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

}

export default KEY;
