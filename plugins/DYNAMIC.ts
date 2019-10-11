import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class DYNAMIC extends STATEMENT {
    
    dynamic: String;
    
    // needs a loop of sorts
    parse(): void {
        this.dynamic = tokenizer.get_next_token();
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

}

export default DYNAMIC;