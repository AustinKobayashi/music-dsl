import NODE from './NODE';
import STATEMENT from './STATEMENT';
import SECTION from './SECTION';
import tokenizer from "~/plugins/tokenizer";

class PROGRAM extends NODE {

    statements: Array<STATEMENT> = [];


    parse(): void {
        while(tokenizer.has_more_tokens()) {

            if (tokenizer.check_next_token('TITLE')) {
                // title
                throw new Error('Title Not Implemented Yet');


            } else if (tokenizer.check_next_token('PRINT')) {
                // print
                throw new Error('Print Not Implemented Yet');


            } else {
                let statement: STATEMENT = new SECTION();
                statement.parse();
                this.statements.push(statement);
            }
        }
    }

    evaluate(): void {
    }

    name_check(): void {
    }

    duration_check(): void {
    }
}

export default PROGRAM;