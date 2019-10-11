import STATEMENT from './STATEMENT';
import tokenizer from './tokenizer';
import { resultXML } from './parser';

export const TITLE_TOKEN: string = 'TITLE';

class TITLE extends STATEMENT {
  
  title: string;
  
  parse(): void {
    tokenizer.get_and_check_next(TITLE_TOKEN);
    this.title = tokenizer.get_next_token();
  }  
  evaluate(): void {
    // resultXML + `<work><work-title>${this.title}</work-title>`
  }
  support_check(): void {
    throw new Error("Method not implemented.");
  }
  name_check(): void {
    throw new Error('Method not implemented.');
  }
  duration_check(): void {
    throw new Error('Method not implemented.');
  }
}

export default TITLE;