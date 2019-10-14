import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class DURATION extends STATEMENT {

    type: string;

    xml: string = '';

    durations = {
        'whole': 4 * 128,
        'half': 2 * 128,
        'quarter': 128,
        'eighth': 128 / 2,
        'sixteenth': 128 / 4,
        'thirty-second': 128 / 8,
        'sixty-fourth': 128 / 16,
        'hundred twenty-eighth': 128 / 32
    };

    // needs a loop of sorts
    parse(): void {
        this.type = tokenizer.get_next_token();
    }

    evaluate(): void {
        this.xml += '<type>' + this.type + '</type>\n';
        this.xml += '<duration>' + this.durations[this.type] + '</duration>\n';
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

    get_duration(): number {
        return this.durations[this.type];
    }

    clef_check(): void {
    }
}

export default DURATION;