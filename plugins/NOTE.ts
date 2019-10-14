import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class NOTE extends STATEMENT {

  articulation: string;
  duration: string;
  is_chord: boolean;
  modifier: string;
  octave: number;
  pitch: string;
  token_length: number;
  xml: string = '';

  parse(): void {
    let token: string = tokenizer.get_next_token();
    token = token.replace(/\s+/g, '');
    this.token_length = token.length;

    this.pitch = token.charAt(0);
    console.log("note length: " + this.token_length.toString());
    if (token.length === 3) {
      this.modifier = token.charAt(1);
      this.octave = parseInt(token.charAt(2), 10);
    }
    else if (token.length === 2)
      this.octave = parseInt(token.charAt(1), 10);
  }

  evaluate(): void {
    this.xml += '<note default-x="26">\n';

    if (this.is_chord)
      this.xml += '<chord/>\n';

    this.xml += '<pitch>\n';
    this.xml += '<step>' + this.pitch + '</step>\n';
    if (this.modifier === '#')
    {
      this.xml += '<alter>1</alter>'
    }
    if (this.modifier === 'b')
    {
      this.xml += '<alter>-1</alter>'
    }
    this.xml += '<octave>' + this.octave + '</octave>\n';
    this.xml += '</pitch>\n';
    this.xml += this.duration;
    this.xml += '<voice>1</voice>\n';
    if (this.modifier === '#')
      this.xml += '<accidental>sharp</accidental>\n';
    if (this.modifier === 'b')
      this.xml += '<accidental>flat</accidental>\n';

    if (this.articulation)
      this.xml += this.articulation;

    this.xml += '</note>\n';
  }

  get_xml(): string {
    return this.xml;
  }

  set_articulation(articulation: string) {
    this.articulation = articulation;
  }

  set_duration(duration: string) {
    this.duration = duration;
  }

  set_is_chord(is_chord: boolean) {
    this.is_chord = is_chord;
  }

  // return note for building xml in KEY
  to_string(): string {
    if (this.token_length === 1)
      return `${this.pitch}`;
    if (this.token_length === 2)
      return `${this.pitch}${this.octave}`;
    if (this.token_length === 3)
      return `${this.pitch}${this.modifier}${this.octave}`;
  }

  // not used
  clef_check(): void { }

  duration_check(): void { }

  name_check(): void { }

  support_check(): void { }

}

export default NOTE;
