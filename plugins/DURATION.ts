import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class DURATION extends STATEMENT {

  durations = {
    'whole': 4 * 128,
    'half': 2 * 128,
    'quarter': 128,
    'eighth': 128 / 2,
    'sixteenth': 128 / 4,
    'thirty-second': 128 / 8,
    'sixty-fourth': 128 / 16,
    'hundred twenty-eighth': 128 / 32
  };
  type: string;
  xml: string = '';

  parse(): void {
    this.type = tokenizer.get_next_token();
  }

  evaluate(): void {
    this.xml += '<type>' + this.type + '</type>\n';
    this.xml += '<duration>' + this.durations[this.type] + '</duration>\n';
  }

  get_duration(): number {
    return this.durations[this.type];
  }

  get_xml(): string {
    return this.xml;
  }

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

  // checked in tokenizer
  support_check(): void { }

}

export default DURATION;