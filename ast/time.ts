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
      this.lower = parseInt(upperAndLower.split(",")[1]);
    }
    console.log("TIME time: " + this.upper + ", " + this.lower);
  }
  
  evaluate() {
    throw new Error("Method not implemented.");
  }
}