import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class ARTICULATION extends STATEMENT {

    articulation: string;

    xml: string = '';

    // needs a loop of sorts
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
                throw new Error('Invalid articulation');
            }

        } else {
            this.xml += '<articulations>\n';
            this.xml += '<' + this.articulation + '/>\n';
            this.xml += '</articulations>\n';
        }
        this.xml += '</notations>\n';
    }

    support_check(): void {
        throw new Error("Method not implemented.");
    }

    name_check(): void {
    }

    duration_check(): void {
    }

    get_xml(): string {
        return this.xml;
    }

    clef_check(): void {
    }
}

export default ARTICULATION;