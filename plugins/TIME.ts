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
    this.xml = `<time><beats>${this.beats}</beats><beat-type>${this.beatType}</beat-type></time>`;
  }

  support_check(): void {
    if (this.beatType % 2 != 0) {
      throw new Error(`Beat Type ${this.beatType} is not even`);
    }
  }
  name_check(): void {
    throw new Error("Method not implemented.");
  }
  duration_check(): void {
    throw new Error("Method not implemented.");
  }

  get_xml(): string {
    return this.xml;
  }
}

export default TIME;