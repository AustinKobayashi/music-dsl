import STATEMENT from "~/plugins/STATEMENT";
import tokenizer from "~/plugins/tokenizer";

class DYNAMIC extends STATEMENT {

    dynamic: string;
    xml: string = '';

    // needs a loop of sorts
    parse(): void {
        this.dynamic = tokenizer.get_next_token();
    }

    evaluate(): void {
        this.xml += '<direction>\n';
        this.xml += '<direction-type>\n';

        if (tokenizer.is_dynamic(this.dynamic)) {
            this.xml += '<dynamics>\n';
            this.xml += '<' + this.dynamic + '/>\n';
            this.xml += '</dynamics>\n';
        } else if (tokenizer.is_direction(this.dynamic)) {
            if (this.dynamic.includes('begin')) {
                this.xml += '<wedge type="' + this.dynamic.replace('begin', '').trim() + '"/>';
            } else if (this.dynamic.includes('end')) {
                this.xml += '<wedge spread="15" type="stop"/>';
            }
        } else {
            throw new Error('Invalid dynamic');
        }

        this.xml += '</direction-type>\n';
        this.xml += '</direction>\n';
    }
    
    support_check(): void {
        throw new Error("Method not implemented.");
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

export default DYNAMIC;