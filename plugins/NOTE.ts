import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class NOTE extends STATEMENT {

    pitch: string;
    octave: number;
    modifier: string;
    
    token_length: number;

    parse(): void {
        let token: string = tokenizer.get_next_token();
        token = token.replace(/\s+/g,'');
        this.token_length = token.length;
        
        this.pitch = token.charAt(0);
        
        if (this.token_length === 2) 
        this.octave = parseInt(token.charAt(1), 10);
        
        if (this.token_length === 3) {
            this.modifier = token.charAt(1);
            this.octave = parseInt(token.charAt(2), 10);
        }
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

    to_string(): string {
        if (this.token_length === 1)
            return `${this.pitch}`;
        if (this.token_length === 2)
            return `${this.pitch}${this.octave}`;
        if (this.token_length === 3)
            return `${this.pitch}${this.modifier}${this.octave}`;
    }

    get_xml(): string {
        throw new Error("Method not implemented.");
    }

    clef_check(): void {
    }
}

export default NOTE;