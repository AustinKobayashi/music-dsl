import NODE from "~/plugins/NODE";
import PROGRAM from "~/plugins/PROGRAM";
import tokenizer from "~/plugins/tokenizer";

export const resultXML: string = "";

const parser = {


  parse(user_input: string): string {
      let program: NODE = new PROGRAM();

      try {
          tokenizer.tokenize(user_input);

          program.parse();
            //...type checking...
            // program.support_check();
            // program.name_check(); //Assert print uses sections that actually exist
            // program.duration_check(); //Assert sections in print have same duration

          program.evaluate();
          console.log(program.get_xml());

          return program.get_xml();

      } catch (e) {
          console.warn(e);
      }

    return program.get_xml();
  }
};

export default parser;
