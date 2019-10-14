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
            '</words>\n</direction-type>\n<staff>1</staff>\n<sound tempo="60"/>\n</direction>';
    }

    support_check(): void {
    }

    name_check(): void {
        throw new Error("Method not implemented.");
    }

    duration_check(): void {
        throw new Error("Method not implemented.");
    }

    to_string(): string {
        return this.tempoString;
    }

    get_xml(): string {
        return this.xml;
    }
}

export default TEMPO;
