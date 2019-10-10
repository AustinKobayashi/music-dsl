import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import NOTE from "~/plugins/NOTE";

class CHORD extends STATEMENT {

    notes: Array<NOTE> = [];

    // needs a loop of sorts
    parse(): void {
        let note: NOTE = new NOTE();
        note.parse();
        this.notes.push(note);

        while(tokenizer.is_next_token_note()) {
            let note: NOTE = new NOTE();
            note.parse();
            this.notes.push(note);
        }

        if (tokenizer.is_next_token_duration()) {
            // duration
            throw new Error('Duration Not Implemented Yet');

        } else if (tokenizer.is_next_token_articulation()) {
            // articulation
            throw new Error('Articulation Not Implemented Yet');


        } else if (tokenizer.is_next_token_dynamic()) {
            // dynamic
            throw new Error('Dynamic Not Implemented Yet');


        } else { throw new Error('Invalid chord'); }
    }

    evaluate(): void {
    }

    name_check(): void {
    }

    duration_check(): void {
    }

}

export default CHORD;