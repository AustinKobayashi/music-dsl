import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import CHORD from "~/plugins/CHORD";

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
                throw new Error('Clef Not Implemented Yet');


            } else if(tokenizer.check_next_token('KEY')) {
                // key
                throw new Error('Key Not Implemented Yet');


            } else if(tokenizer.check_next_token('TIME')) {
                // time
                throw new Error('Time Not Implemented Yet');


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

    name_check(): void {
    }

    duration_check(): void {
    }
}

export default SECTION;