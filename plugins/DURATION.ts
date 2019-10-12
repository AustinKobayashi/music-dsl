import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class DURATION extends STATEMENT {

    duration: String;

    // needs a loop of sorts
    parse(): void {
        this.duration = tokenizer.get_next_token();
    }

    evaluate(): void {
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
}

export default DURATION;