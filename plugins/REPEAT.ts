import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class REPEAT extends STATEMENT {

  count: number;
  sections: Array<string> = [];
  xml: string = '';

  parse(): void {
    tokenizer.get_and_check_next('REPEAT');

    while (!tokenizer.check_next_token('\\d+') && tokenizer.has_more_tokens()) {
      this.sections.push(tokenizer.get_next_token());
    }

    this.count = parseInt(tokenizer.get_next_token(), 10);
    tokenizer.get_and_check_next('!!!');
  }

  evaluate(): void { }

  get_sections(): Array<Array<string>> {
    let sections = [];
    for (let i = 0; i < this.count; i++) {
      sections.push(this.sections);
    }
    return sections;
  }

  get_xml(): string {
    return this.xml;
  }

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

  support_check(): void { }

}

export default REPEAT;