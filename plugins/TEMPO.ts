import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

export const TEMPO_TOKEN = "TEMPO";

class TEMPO extends STATEMENT {

  tempoString: string;
  xml: string = '';

  parse(): void {
    tokenizer.get_and_check_next(TEMPO_TOKEN);
    this.tempoString = tokenizer.get_next_token();
  }

  evaluate(): void {
    this.xml = '<direction directive="yes" placement="above">\n<direction-type>\n<words default-y="15" font-size="10.5" font-weight="bold">'
      + this.tempoString +
      '</words>\n</direction-type>\n<staff>1</staff>\n<sound tempo="60"/>\n</direction>\n';
  }

  get_xml(): string {
    return this.xml;
  }

  /* to_string(): string {
    return this.tempoString;
  } */

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

  support_check(): void { }

}

export default TEMPO;
