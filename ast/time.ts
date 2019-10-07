export default class Time implements ASTNode {
  statement: string;
  // TODO: replace names of these variables with their musical vocabulary equivalent for readability
  upper: number;
  lower: number;
  // TODO end
  operator: string = "TIME";

  constructor(statement: string) {
    this.statement = statement;  
  }

  parse() {
    let upperAndLower = this.statement.replace(this.operator, "").trim();
    if (upperAndLower.indexOf(",") < 0) {
      throw new Error(`Wrong definition of time signature, should be of the form: number, number`);
    } else {
      this.upper = parseInt(upperAndLower.split(",")[0]);
      if (this.upper > 9 || this.upper < 1) {
        throw new Error(`Upper has to be between 1 and 9 inclusive`);
      }
      this.lower = parseInt(upperAndLower.split(",")[1]);
      if (!this.isPowerOfTwo(this.lower)) {
        throw new Error(`Lower must be a power of 2`);
      }
    }
    console.log("TIME time: " + this.upper + ", " + this.lower);
  }
  
  evaluate() {
    throw new Error("Method not implemented.");
  }

  private isPowerOfTwo(number: number) {
    if (number === 0) return false;
    return Math.ceil(Math.log(number) / Math.log(2)) === Math.floor(Math.log(number) / Math.log(2));
  }
}