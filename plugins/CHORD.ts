import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";
import NOTE from "~/plugins/NOTE";
import DYNAMIC from "~/plugins/DYNAMIC";
import DURATION from "~/plugins/DURATION";

class CHORD extends STATEMENT {

    notes: Array<NOTE> = [];
    dynamic: DYNAMIC;
    duration: DURATION;

    // needs a loop of sorts
    parse(): void {
        let note: NOTE = new NOTE();
        note.parse();
        this.notes.push(note);

        while (tokenizer.is_next_token_note()) {
            let note: NOTE = new NOTE();
            note.parse();
            this.notes.push(note);
        }

        if (tokenizer.is_next_token_duration()) {
            // duration
            this.duration = new DURATION();
            this.duration.parse();

        } else if (tokenizer.is_next_token_articulation()) {
            // articulation
            throw new Error('Articulation Not Implemented Yet');


        } else if (tokenizer.is_next_token_dynamic()) {
            this.dynamic = new DYNAMIC();
            this.dynamic.parse();

        } else { throw new Error('Invalid chord'); }
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

    clef_check(): void {
    }
}

export default CHORD;