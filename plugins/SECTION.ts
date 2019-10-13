import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import CHORD from "~/plugins/CHORD";
import TIME, { TIME_TOKEN } from "./TIME";
import CLEF, { CLEF_TOKEN } from "./CLEF";
import KEY, { KEY_TOKEN } from "./KEY";

class SECTION extends STATEMENT {

    /* Variables for:
    *   Clef
    *   Key
    *   Time
    *   Tempo
    */
   
   name: string;
   chords: Array<CHORD> = [];
   clef: CLEF;
   key: KEY;
   time: TIME;

   total_duration: number;
   
   parse(): void {
       
       this.name = tokenizer.get_next_token();
       tokenizer.get_and_check_next('<-\\s*{');
       
       while(!tokenizer.check_next_token('}')) {
           
           if(tokenizer.check_next_token(CLEF_TOKEN)) {
               // clef
               this.clef = new CLEF();
               this.clef.parse();
            } else if(tokenizer.check_next_token(KEY_TOKEN)) {
                // key
                this.key = new KEY();
                this.key.parse();
            } else if(tokenizer.check_next_token(TIME_TOKEN)) {
                // time
                this.time = new TIME();
                this.time.parse();
            } else if(tokenizer.check_next_token('TEMPO')) {
                // tempo
                throw new Error('Tempo Not Implemented Yet');


            } else if(tokenizer.is_next_token_note()) {
                let chord: CHORD = new CHORD();
                chord.parse();
                this.chords.push(chord);

            } else { throw new Error('Invalid Section'); }
        }
        tokenizer.get_next_token();
    }

    evaluate(): void {
        this.clef.evaluate();
        this.key.evaluate();
        this.time.evaluate();
        // Have relevant XML for SECTION to wrap all CLEF, KEY, TIME, TEMPO and CHORD(s) and add to PROGRAM.xml
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

    get_total_duration(): number {
       return this.total_duration;
    }

    clef_check(): void {
    }
}

export default SECTION;