export default class Key implements ASTNode {
  statement: string;
  key: number;
  operator: string = "KEY";

  constructor(statement: string) {
    this.statement = statement;  
  }

  parse() {
    this.key = parseInt(this.statement.replace(this.operator, "").trim());
    console.log("KEY key: " + this.key);
  }
  
  evaluate() {
    throw new Error("Method not implemented.");
  }
}