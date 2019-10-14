import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

export const SUPPORTED_QUALITY = ["major", "minor"];

class QUALITY extends STATEMENT {

  quality: string;

  parse(): void {
    this.quality = tokenizer.get_next_token();
    this.support_check();
  }

  // xml built in KEY
  evaluate(): void {}

  // not used
  duration_check(): void {}

  // not used
  name_check(): void {}

  support_check(): void {
    if (SUPPORTED_QUALITY.indexOf(this.quality) < 0)
      throw new Error(`Quality ${this.quality} is not supported.`);
  }

  // return supported quality for building xml in KEY
  to_string(): string { return this.quality; }

  // xml built in KEY
  get_xml(): string { return null; }

    clef_check(): void {
    }

}

export default QUALITY;