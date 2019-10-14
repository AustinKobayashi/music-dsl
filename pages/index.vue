<template>
  <div id="container">
    <b-modal ref="example-modal" hide-footer title="Example" size="xl">
      <div id="modal-content">
        <img id="example-img" src="/example.png" />
      </div>
    </b-modal>
    <b-modal id="ebnf-modal" ref="ebnf-modal" hide-footer title="EBNF" size="lg">
      <p>PROGRAM  ::= TITLE SECTION* PRINT</p>
      <p>PRINT ::= “ -> ” “{“ [REPEAT, (SECTION (“,” SECTION)*)]+ “}”</p>
      <p>TITLE ::= “TITLE” STRING</p>
      <p>SECTION ::= STRING “ <- ” “{“ CLEF KEY TIME TEMPO CHORD+ “}”</p>
      <p>REPEAT ::= “REPEAT” SECTION (“, ” SECTION)* INTEGER</p>
      <p>CLEF ::= [“Treble”, “Bass”, “Alto”]</p>
      <p>KEY ::= NOTE QUALITY</p>
      <p>TIME ::= [1-9]+ / 2k, k > 0</p>
      <p>TEMPO ::= “TEMPO” STRING</p>
      <p>CHORD ::= NOTE (“, ” NOTE)* “, ” DURATION (“, “ DYNAMIC)? (“, ” ARTICULATION)*</p>
      <p>NOTE ::= [“C”, “D”, “E”, “F”, “G”, “A”, “B”] MODIFIER? [0-9]</p>
      <p>MODIFIER ::= [“#”, “b”]</p>
      <p>QUALITY ::= [“major”, “minor”]</p>
      <p>ARTICULATION ::= ["staccato", "tenuto", "marcato", "accent", "begin slur", "end slur"]</p>
      <p>
        DYNAMIC ::= ["ppp", "pp", "p", "mp", "mf", "fp", "fz", "rf", "rfz", "sf", "f", "ff", "fff", "begin crescendo",
        "end crescendo", "begin decrescendo", "end decrescendo",
        "begin diminuendo", "end diminuendo"]
      </p>
      <p>DURATION ::= ["whole", "half", "quarter", "eighth", "sixteenth", "thirty-second", "sixty-fourth", "hundred twenty-eighth"]</p>
    </b-modal>
    <div id="top-bar">
      <button type="button" class="btn btn-primary" @click="show_example_modal">
        Example
      </button>
      <button type="button" class="btn btn-secondary" @click="show_ebnf_modal">
        ENBF
      </button>
    </div>
    <div id="content">
      <div id="editor">
        <textarea id="input-area" v-model="user_input" @change="generate_music" />
      </div>
      <div id="osmdCanvas" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef,no-console */
import '../static/opensheetmusicdisplay.min'
import parser from '../plugins/parser.ts'

export default {
  data() {
    return {
      openSheetMusicDisplay: undefined,
      user_input: '',
      example_modal: false,
      ebnf_modal: false
    }
  },
  mounted() {
    // this.openSheetMusicDisplay = new opensheetmusicdisplay.OpenSheetMusicDisplay('osmdCanvas', {
    //   // set options here
    //   backend: 'svg',
    //   drawFromMeasureNumber: 1,
    //   drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER
    // })
    this.openSheetMusicDisplay = new opensheetmusicdisplay.OpenSheetMusicDisplay('osmdCanvas', {
      autoResize: true,
      backend: 'svg',
      disableCursor: false,
      drawingParameters: 'default', // try compact (instead of default)
      drawPartNames: true, // try false
      // drawTitle: false,
      // drawSubtitle: false,
      // drawFromMeasureNumber: 4,
      // drawUpToMeasureNumber: 8,
      drawFingerings: true,
      fingeringPosition: 'auto', // left is default. try right. experimental: auto, above, below.
      // fingeringInsideStafflines: "true", // default: false. true draws fingerings directly above/below notes
      setWantedStemDirectionByXml: true, // try false, which was previously the default behavior
      // drawUpToMeasureNumber: 3, // draws only up to measure 3, meaning it draws measure 1 to 3 of the piece.

      // coloring options
      coloringEnabled: true,
      // defaultColorNotehead: "#CC0055", // try setting a default color. default is black (undefined)
      // defaultColorStem: "#BB0099",

      autoBeam: false, // try true, OSMD Function Test AutoBeam sample
      autoBeamOptions: {
        beam_rests: false,
        beam_middle_rests_only: false,
        // groups: [[3,4], [1,1]],
        maintain_stem_directions: false
      }
    })
    this.openSheetMusicDisplay.setLogLevel('trace')
  },
  methods: {
    generate_music() {
      this.openSheetMusicDisplay
        .load(parser.parse(this.user_input))
        .then(() => {
          window.osmd = this.openSheetMusicDisplay
          return this.openSheetMusicDisplay.render()
        },
        function (e) {
          console.error(e)
        }
        ).then(
          function () {
            console.log('here?')
          }, function (e) {
            console.error(e)
          }
        )
    },
    show_example_modal() {
      this.$refs['example-modal'].show()
    },
    hide_example_modal() {
      this.$refs['example-modal'].hide()
    },
    show_ebnf_modal() {
      this.$refs['ebnf-modal'].show()
    },
    hide_ebnf_modal() {
      this.$refs['ebnf-modal'].hide()
    }
  }
}
</script>

<style>
button {
    margin-right: 5px;
}

p {
    margin-bottom: 0.5rem;
}

#container {
    margin-left: 10px;
    min-height: 100vh;
}

#ebnf-modal {
    font-size: 1rem;
}

#example-img {
  width: 100%;
}

#top-bar {
    margin-top: 5px;
    margin-bottom: 5px;
}

#content,
#top-bar {
    display: flex;
}

#input-area {
    min-height: 92vh;
    width: 30vw;
    font-size: 1rem;
}

#osmdCanvas {
    width: 70vw;
}
</style>
