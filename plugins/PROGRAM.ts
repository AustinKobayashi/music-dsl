import NODE from './NODE';
import STATEMENT from './STATEMENT';
import SECTION from './SECTION';
import tokenizer from "~/plugins/tokenizer";
import TITLE, { TITLE_TOKEN } from './TITLE';
import PRINT from "~/plugins/PRINT";

class PROGRAM extends NODE {

    statements: Array<STATEMENT> = [];
    print: PRINT;

    xml: string;

    parse(): void {
        while (tokenizer.has_more_tokens()) {
            if (tokenizer.check_next_token(TITLE_TOKEN)) {
                let title: TITLE = new TITLE();
                title.parse();
                this.statements.push(title);
                
            } else if (tokenizer.check_next_token('PRINT')) {
                this.print = new PRINT();
                this.print.parse();

            } else {
                let statement: STATEMENT = new SECTION();
                statement.parse();
                this.statements.push(statement);
            }
        }
    }

    evaluate(): void {
        for (let s of this.statements) {
            s.evaluate();
        }

        this.print.evaluate();
        this.xml = this.print.get_xml();
    }
    
    support_check(): void {
    }

    name_check(): void {
    }

    duration_check(): void {
    }

    get_xml(): string {
        return this.xml;
    }

    clef_check(): void {
    }
}

export default PROGRAM;