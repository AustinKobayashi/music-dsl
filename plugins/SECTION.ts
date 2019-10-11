import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import CHORD from "~/plugins/CHORD";
import TIME from "./TIME";
import CLEF from "./CLEF";

class SECTION extends STATEMENT {
    
    /* Variables for:
    *   Clef
    *   Key
    *   Time
    *   Tempo
    */

   name: string;
   chords: Array<CHORD> = [];
   
   
   parse(): void {

       this.name = tokenizer.get_next_token();
       tokenizer.get_and_check_next('<-\\s*{');
       
       while(!tokenizer.check_next_token('}')) {
           
           if(tokenizer.check_next_token('CLEF')) {
               // clef
                let clef: CLEF = new CLEF();
                clef.parse();
            } else if(tokenizer.check_next_token('KEY')) {
                // key
                throw new Error('Key Not Implemented Yet');
                

            } else if(tokenizer.check_next_token('TIME')) {
                // time
                let time: TIME = new TIME();
                time.parse();
            } else if(tokenizer.check_next_token('TEMPO')) {
                // tempo
                throw new Error('Tempo Not Implemented Yet');
                

            } else if(tokenizer.is_next_token_note()) {
                let chord: CHORD = new CHORD();
                chord.parse();
                this.chords.push(chord);
                
            } else { throw new Error('Invalid Section'); }
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
}

export default SECTION;