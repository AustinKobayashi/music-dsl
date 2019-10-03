export default class Line {
  
  fullLine: string;
  tokens: string[] = [];

  constructor(line: string) {
    this.fullLine = line;
  }

  parse() {
    this.tokens = this.fullLine.split(" ");
  }
  
  evaluate() {

  }
}