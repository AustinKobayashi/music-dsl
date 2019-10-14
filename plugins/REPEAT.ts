import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

export const SUPPORTED_QUALITY = ["major", "minor"];

class REPEAT extends STATEMENT {

    sections: Array<string> = [];
    count: number;
    xml: string = '';

    parse(): void {

        tokenizer.get_and_check_next('REPEAT');

        while(!tokenizer.check_next_token('\\d+') && tokenizer.has_more_tokens()) {
            this.sections.push(tokenizer.get_next_token());
        }

        this.count = parseInt(tokenizer.get_next_token(), 10);
        tokenizer.get_and_check_next('!!!');
    }

    // xml built in KEY
    evaluate(): void {}

    // not used
    duration_check(): void {}

    // not used
    name_check(): void {}

    support_check(): void {
    }

    // xml built in KEY
    get_xml(): string {
        return this.get_xml();
    }

    get_sections(): Array<Array<string>> {
        let sections = [];
        for (let i = 0; i < this.count; i++) {
            sections.push(this.sections);
        }
        return sections;
    }

    clef_check(): void {
    }

}

export default REPEAT;