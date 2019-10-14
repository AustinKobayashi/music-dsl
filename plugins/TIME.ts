import STATEMENT from "./STATEMENT";
import tokenizer from "./tokenizer";

export const TIME_TOKEN = "TIME";
export const TIME_SEPARATOR = "/";

class TIME extends STATEMENT {

  xml: string;
  beats: number;
  beatType: number;

  parse(): void {
    tokenizer.get_and_check_next(TIME_TOKEN);
    this.beats = parseInt(tokenizer.get_next_token());
    tokenizer.get_and_check_next(TIME_SEPARATOR);
    this.beatType = parseInt(tokenizer.get_next_token());
  }
  evaluate(): void {
    this.xml = `<time>\n<beats>${this.beats}</beats>\n<beat-type>${this.beatType}</beat-type>\n</time>\n`;
  }

  support_check(): void {
    if (this.beatType % 2 != 0)
      throw new Error(`Beat Type ${this.beatType} is not even`);
  }

  // called in SECTION to dynamically set measure duration 
  get_beats(): number {
    return this.beats;
  }

  get_xml(): string {
    return this.xml;
  }

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

}

export default TIME;