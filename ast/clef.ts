enum SupportedClefs {
  Treble = "Treble",
  Bass = "Bass",
  Alto = "Alto"
}

export default class Clef implements ASTNode {
  statement: string;
  clef: SupportedClefs;
  operator: string = "CLEF";

  constructor(statement: string) {
    this.statement = statement;
  }

  parse() {
    let userDefinedClef = this.statement.replace(this.operator, "").trim();
    if (userDefinedClef === SupportedClefs.Bass) {
      this.clef = SupportedClefs.Bass;
    } else if (userDefinedClef === SupportedClefs.Treble) {
      this.clef = SupportedClefs.Treble;
    } else if (userDefinedClef === SupportedClefs.Alto) {
      this.clef = SupportedClefs.Alto;
    } else {
      throw new Error(`${userDefinedClef} is not a supported Clef.`);
    }
    console.log("CLEF clef: " + this.clef);
  }

  evaluate() {
    throw new Error("Method not implemented.");
  }
}