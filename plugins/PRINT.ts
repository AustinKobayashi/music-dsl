import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import CHORD from "~/plugins/CHORD";
import TIME, { TIME_TOKEN } from "./TIME";
import CLEF, { CLEF_TOKEN } from "./CLEF";
import KEY, { KEY_TOKEN } from "./KEY";
import NODE from "~/plugins/NODE";
import SECTION from "~/plugins/SECTION";

class PRINT extends STATEMENT {

    sections: Array<Array<SECTION> > = [];

    xml: string = '';


    parse(): void {
        tokenizer.get_and_check_next('PRINT');
        tokenizer.get_and_check_next('->\\s*{');

        while(!tokenizer.check_next_token('}')) {

            if(tokenizer.check_next_token('REPEAT')) {
                // repeat
                throw new Error('Not implemented yet');

            } else {
                let stacked = [];
                while(!tokenizer.check_next_token('!!!')) {
                    stacked.push(tokenizer.get_next_token());
                }
                tokenizer.get_next_token();
                this.sections.push(stacked);
            }
        }
        tokenizer.get_next_token();
        throw new Error();
    }

    evaluate(): void {
        this.xml += '<?xml version="1.0" standalone="no"?>\n';
        this.xml += '<!DOCTYPE score-partwise>\n';
        this.xml += '<score-partwise>\n';

        this.xml += '<part-list>\n';

        this.xml += '<part-list>\n';

        this.xml += '</score-partwise>\n';
    }

    merge_sections(sections: Array<SECTION>, index: number): string {
        let xml: string = '';

        xml += `<part id=${index}>\n`;

        for (let i = 0; i < )
        return '';
    }

    support_check(): void {
        throw new Error("Method not implemented.");
    }

    name_check(): void {
    }

    duration_check(): void {
    }

    get_xml(): string {
        throw new Error("Method not implemented.");
    }

    clef_check(): void {
    }
}

export default PRINT;