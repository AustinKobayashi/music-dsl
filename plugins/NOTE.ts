import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class NOTE extends STATEMENT {
    
    pitch: string;
    octave: number;
    modifier: string;
    

    parse(): void {
        let token: string = tokenizer.get_next_token();
        token = token.replace(/\s+/g,'');
        
        this.pitch = token.charAt(0);
        this.octave = parseInt(token.charAt(1), 10);
        
        if (token.length === 3)
        this.modifier = token.charAt(2);
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

export default NOTE;