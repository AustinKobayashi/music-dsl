import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class ARTICULATION extends STATEMENT {

  articulation: string;
  xml: string = '';

  parse(): void {
    this.articulation = tokenizer.get_next_token();
  }

  evaluate(): void {
    this.xml += '<notations>\n';
    if (this.articulation.includes('slur')) {

      if (this.articulation.includes('begin')) {
        this.xml += '<slur number="1" type="start"/>\n';
      } else if (this.articulation.includes('end')) {
        this.xml += '<slur number="1" type="stop"/>\n';
      } else {
        throw new Error('Invalid articulation: ' + this.articulation);
      }

    } else {
      this.xml += '<articulations>\n';
      this.xml += '<' + this.articulation + '/>\n';
      this.xml += '</articulations>\n';
    }
    this.xml += '</notations>\n';
  }

  get_xml(): string {
    return this.xml;
  }

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

  // checked in tokenizer
  support_check(): void { }

}

export default ARTICULATION;
