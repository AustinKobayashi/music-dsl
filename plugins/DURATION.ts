import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class DURATION extends STATEMENT {

  // valid values are 1024th, 512th, 256th, 128th, 64th, 32nd, 16th, eighth, quarter, half, whole
  durations = {
    'whole': 4 * 128,
    'dotted-half': 3 * 128,
    'half': 2 * 128,
    'dotted-quarter': 128 + 128 / 2,
    'quarter': 128,
    'dotted-eighth': 128 / 2 + 128 / 4,
    'eighth': 128 / 2,
    'dotted-16th': 128 / 4 + 128 / 8,
    '16th': 128 / 4,
    'dotted-32nd': 128 / 8 + 128 / 16,
    '32nd': 128 / 8,
    'dotted-64th': 128 / 16 + 128 / 32,
    '64th': 128 / 16,
    'dotted-128th': 128 / 32 + 128 / 64,
    '128th': 128 / 32
  };
  type: string;
  xml: string = '';

  parse(): void {
    this.type = tokenizer.get_next_token();
  }

  evaluate(): void {
    if (this.type.indexOf('dotted-') < 0) {
      this.xml += '<type>' + this.type + '</type>\n';
      this.xml += '<duration>' + this.durations[this.type] + '</duration>\n';
    } else {
      let type = this.type.replace('dotted-', '');
      this.xml += '<type>' + type + '</type>\n';
      this.xml += `<dot/>\n`;
      this.xml += '<duration>' + this.durations[this.type] + '</duration>\n';
    }
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