import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class DYNAMIC extends STATEMENT {

  dynamic: string;
  xml: string = '';

  parse(): void {
    this.dynamic = tokenizer.get_next_token();
  }

  evaluate(): void {
    this.xml += '<direction>\n';
    this.xml += '<direction-type>\n';

    if (tokenizer.is_dynamic(this.dynamic)) {
      this.xml += '<dynamics>\n';
      this.xml += '<' + this.dynamic + '/>\n';
      this.xml += '</dynamics>\n';
    } else if (tokenizer.is_direction(this.dynamic)) {
      if (this.dynamic.includes('begin')) {
        if (this.dynamic.includes('crescendo'))
          this.xml += '<wedge spread="0" type="' + this.dynamic.replace('begin', '').trim() + '"/>\n';
        if (this.dynamic.includes('diminuendo'))
          this.xml += '<wedge type="' + this.dynamic.replace('begin', '').trim() + '"/>\n';

      } else if (this.dynamic.includes('end')) {
        if (this.dynamic.includes('crescendo'))
          this.xml += '<wedge spread="15" type="stop"/>\n';
        if (this.dynamic.includes('diminuendo'))
          this.xml += '<wedge type="stop"/>\n';

      }
    } else {
      throw new Error('Invalid dynamic');
    }

    this.xml += '</direction-type>\n';
    this.xml += '</direction>\n';
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

export default DYNAMIC;