import STATEMENT from './STATEMENT';
import tokenizer from './tokenizer';
import NODE from "~/plugins/NODE";

export const TITLE_TOKEN: string = 'TITLE';

class TITLE extends STATEMENT {

  title: string;
  xml: string;

  parse(): void {
    tokenizer.get_and_check_next(TITLE_TOKEN);
    this.title = tokenizer.get_next_token();
  }

  evaluate(): void {
    this.xml = `<work>\n<work-title>${this.title}</work-title>\n</work>\n`;
    NODE.title = this.xml;
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

export default TITLE;