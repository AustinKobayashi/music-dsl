enum supportedClefs {
  Treble = "Treble",
  Bass = "Bass",
}

export default class Clef implements ASTNode {
  statement: string;
  clef: supportedClefs;
  operator: string = "CLEF";

  constructor(statement: string) {
    this.statement = statement;
  }

  parse() {
    let userDefinedClef = this.statement.replace(this.operator, "").trim();
    if (userDefinedClef === supportedClefs.Bass) {
      this.clef = supportedClefs.Bass;
    } else if (userDefinedClef === supportedClefs.Treble) {
      this.clef = supportedClefs.Treble;
    } else {
      throw new Error(`${userDefinedClef} is not a supported Clef.`);
    }
    console.log("CLEF clef: " + this.clef);
  }

  evaluate() {
    throw new Error("Method not implemented.");
  }
}