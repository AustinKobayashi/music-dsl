/* eslint-disable no-undef,no-console */
import '../static/opensheetmusicdisplay.min'
import parser from '../plugins/parser.ts'

export default {
  updateStatus(status) {
    let current = document.getElementById('status')
    current.innerHTML = status
  },

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