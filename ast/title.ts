export default class Title implements ASTNode {
  statement: string;
  title: string;
  operator: string = "TITLE";

  constructor(statement: string) {
    this.statement = statement;  
  }

  parse() {
    this.title = this.statement.replace(this.operator, "").trim();
    console.log("TITLE title: " + this.title);
  }

  evaluate() {
    throw new Error("Method not implemented.");
  }
}