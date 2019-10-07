import Note from "./note";
import Quality from "./quality";

export default class Key implements ASTNode {
  statement: string;
  note: Note;
  quality: Quality;
  operator: string = "KEY";

  constructor(statement: string) {
    this.statement = statement;  
  }

  parse() {
    let parts = this.statement.replace(this.operator, "").trim();
    // TODO: Need implementation of NOTE
    this.note = new Note(parts[0]);
    this.note.parse();
    this.quality = new Quality(parts[1]);
    this.quality.parse();
    console.log(`KEY key: ${this.note} ${this.quality}`);
  }
  
  evaluate() {
    throw new Error("Method not implemented.");
  }
}