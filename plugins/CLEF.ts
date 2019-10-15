import STATEMENT from "./STATEMENT";
import tokenizer from "./tokenizer";

export const CLEF_TOKEN = "CLEF";
export const SUPPORTED_CLEF = ["Treble", "Alto", "Bass"];

class CLEF extends STATEMENT {

  clef: string;
  line: number;
  sign: string;
  xml: string;

  comparator = {
    'Alto': 0,
    'Treble': 1,
    'Bass': 2
  };

  parse(): void {
    tokenizer.get_and_check_next(CLEF_TOKEN);
    this.clef = tokenizer.get_next_token();
    this.support_check();
  }

  evaluate(): void {
    if (this.clef === "Treble") {
      this.sign = "G";
      this.line = 2;
    } else if (this.clef === "Alto") {
      this.sign = "C";
      this.line = 3;
    } else if (this.clef === "Bass") {
      this.sign = "F";
      this.line = 4;
    } else {
      throw new Error("Invalid CLEF: " + this.clef);
    }

    this.xml = `<clef>\n<sign>${this.sign}</sign>\n<line>${this.line}</line>\n</clef>\n`;
  }

  support_check(): void {
    if (SUPPORTED_CLEF.indexOf(this.clef) < 0)
      throw new Error(`Clef not supported: ${this.clef}`);
  }

  get_comparator(): number {
    return this.comparator[this.clef];
  }

  get_xml() {
    return this.xml;
  }

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

}

export default CLEF;
