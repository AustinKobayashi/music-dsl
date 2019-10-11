import STATEMENT from "./STATEMENT";
import tokenizer from "./tokenizer";

export const CLEF_TOKEN = "CLEF";
export const SUPPORTED_CLEF = ["Treble", "Alto", "Bass"];

class CLEF extends STATEMENT {

  clef: string;
  sign: string;
  line: number;

  parse(): void {
    tokenizer.get_and_check_next(CLEF_TOKEN);
    this.clef = tokenizer.get_next_token();
  }
  evaluate(): void {
    throw new Error("Method not implemented.");
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


}

export default CLEF;