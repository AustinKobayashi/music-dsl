import Title from "./title";
import Clef from "./clef";
import Key from "./key";
import Time from "./time";

export default abstract class Statement {
  
  static getStatement(statement: string) {
    if (statement.startsWith("TITLE")) {
      return new Title(statement);
    }
    if (statement.startsWith("CLEF")) {
      return new Clef(statement);
    }
    if (statement.startsWith("KEY")) {
      return new Key(statement);
    }
    if (statement.startsWith("TIME")) {
      return new Time(statement);
    }

    //TODO variable allocation <- 
    throw new Error(`Unsupported operator`);
  }
}