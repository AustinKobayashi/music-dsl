import STATEMENT from './STATEMENT';
import tokenizer from './tokenizer';
import PROGRAM from "./PROGRAM";

export const TITLE_TOKEN: string = 'TITLE';

class TITLE extends STATEMENT {
  
  xml: string;
  title: string;
  
  parse(): void {
    tokenizer.get_and_check_next(TITLE_TOKEN);
    this.title = tokenizer.get_next_token();
  }  

  evaluate(): void {
    this.xml = `<work><work-title>${this.title}</work-title></work>`;
    PROGRAM.xml.set(TITLE_TOKEN, this.xml);
  }
  
  support_check(): void {}
  
  name_check(): void {
    throw new Error('Method not implemented.');
  }
  
  duration_check(): void {
    throw new Error('Method not implemented.');
  }

  get_xml(): string {
    return this.xml;
  }

    clef_check(): void {
    }
}

export default TITLE;