import STATEMENT from "./STATEMENT";
import tokenizer from "./tokenizer";

export const CLEF_TOKEN = "CLEF";
export const SUPPORTED_CLEF = ["Treble", "Alto", "Bass"];

class CLEF extends STATEMENT {

  clef: string;
  xml: string;
  sign: string;
  line: number;

  parse(): void {
    tokenizer.get_and_check_next(CLEF_TOKEN);
    this.clef = tokenizer.get_next_token();
  }

  evaluate(): void {
    if (this.clef === "Treble") {
      this.sign = "G";
      this.line = 2;
    }
    
    if (this.clef === "Alto") {
      this.sign = "C";
      this.line = 3;
    }

    if (this.clef === "Bass") {
      this.sign = "F";
      this.line = 4;
    }

    this.xml = `<clef>\n<sign>${this.sign}</sign>\n<line>${this.line}</line>\n</clef>\n`;
  }

  support_check(): void {
    if (SUPPORTED_CLEF.indexOf(this.clef) < 0) {
      throw new Error(`Clef ${this.clef} is not supported.`);
    }
  }

  name_check(): void {
    throw new Error("Method not implemented.");
  }

  duration_check(): void {
    throw new Error("Method not implemented.");
  }

  get_xml() {
    return this.xml;
  }

    clef_check(): void {
    }
}

export default CLEF;