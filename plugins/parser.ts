import Line from "../ast/line";

const parser = {

  // !!!!!!!!!!!!!!!!!!!!!!!!
  // parse method stub
  // !!!!!!!!!!!!!!!!!!!!!!!!
  parse(user_input: string) {
    let lines: string[] = user_input.split("\n");
    
    for (let l of lines) {
      let line = new Line(l);
      line.parse();
    }
    // This just returns a basic version of the xml
    // TODO: add parsing functionality
    return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
      '<!DOCTYPE score-partwise PUBLIC\n' +
      '    "-//Recordare//DTD MusicXML 3.1 Partwise//EN"\n' +
      '    "http://www.musicxml.org/dtds/partwise.dtd">\n' +
      '<score-partwise version="3.1">\n' +
      '  <part-list>\n' +
      '    <score-part id="P1">\n' +
      '      <part-name>Music</part-name>\n' +
      '    </score-part>\n' +
      '  </part-list>\n' +
      '  <part id="P1">\n' +
      '    <measure number="1">\n' +
      '      <attributes>\n' +
      '        <divisions>4</divisions>\n' +
      '        <key>\n' +
      '          <fifths>0</fifths>\n' +
      '        </key>\n' +
      '        <time>\n' +
      '          <beats>4</beats>\n' +
      '          <beat-type>4</beat-type>\n' +
      '        </time>\n' +
      '        <clef>\n' +
      '          <sign>G</sign>\n' +
      '          <line>2</line>\n' +
      '        </clef>\n' +
      '      </attributes>\n' +
      '      <note>\n' +
      '        <pitch>\n' +
      '          <step>C</step>\n' +
      '          <octave>3</octave>\n' +
      '        </pitch>\n' +
      '        <duration>4</duration>\n' +
      '        <type>quarter</type>\n' +
      '      </note>\n' +
      '    </measure>\n' +
      '  </part>\n' +
      '</score-partwise>\n';
  }
};

export default parser;
