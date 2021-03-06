import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class NOTE extends STATEMENT {

    pitchClass: string;
    octave: number;
    modifier: string;
    duration: string;
    articulation: string;

    is_chord: boolean;
    is_rest: boolean;

    token_length: number;

    xml: string = '';


  parse(): void {
    let token: string = tokenizer.get_next_token();
    token = token.replace(/\s+/g, '');
    this.token_length = token.length;

    this.pitchClass = token.charAt(0);
    if (token.length === 3) {
      this.modifier = token.charAt(1);
      this.octave = parseInt(token.charAt(2), 10);
    }
    else if (token.length === 2)
      this.octave = parseInt(token.charAt(1), 10);
    this.support_check();
  }

    evaluate(): void {
        this.xml += '<note>\n';

        if (this.is_chord)
            this.xml += '<chord/>\n';

        this.xml += '<pitch>\n';
        this.xml += '<step>' + this.pitchClass + '</step>\n';
        if (this.modifier === '#')
            this.xml += '<alter>1</alter>\n';
        if (this.modifier === 'b')
            this.xml += '<alter>-1</alter>\n';
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

    support_check(): void {
        if (this.pitchClass < 'A' || this.pitchClass > 'G')
        {
            throw new Error("Pitch Class not supported: " + this.pitchClass);
        }
        if (typeof this.octave !== "undefined" && this.octave < 0 || this.octave > 9)
        {
            throw new Error("Octave number not supported: " + this.octave);
        }
        if (typeof this.modifier !== "undefined" && !(this.modifier === "#" || this.modifier === "b"))
        {
            throw new Error("Accidental not supported: " + this.modifier);
        }
    }

    name_check(): void {
    }

    duration_check(): void {
    }

    to_string(): string {
        if (this.token_length === 1)
            return `${this.pitchClass}`;
        if (this.token_length === 2)
            return `${this.pitchClass}${this.octave}`;
        if (this.token_length === 3)
            return `${this.pitchClass}${this.modifier}${this.octave}`;
    }

    get_xml(): string {
        return this.xml;
    }

    set_duration(duration: string) {
        this.duration = duration;
    }

    set_is_chord(is_chord: boolean) {
        this.is_chord = is_chord;
    }

    set_articulation(articulation: string) {
        this.articulation = articulation;
    }

    clef_check(): void {
    }
}

export default NOTE;
