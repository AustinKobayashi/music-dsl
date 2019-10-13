<template>
  <div id="container">
    <div id="editor">
      <textarea id="input-area" v-model="user_input" @change="generate_music" />
    </div>
    <div id="osmdCanvas" />
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
      user_input: ''
    }
  },
  mounted() {
    this.openSheetMusicDisplay = new opensheetmusicdisplay.OpenSheetMusicDisplay('osmdCanvas', {
      // set options here
      backend: 'svg',
      drawFromMeasureNumber: 1,
      drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER
    })
  },
  methods: {
    generate_music() {
      this.openSheetMusicDisplay
        .load(parser.parse(this.user_input))
        .then(
          function () {
            window.osmd = this.openSheetMusicDisplay
            this.openSheetMusicDisplay.render()
          },
          function (e) {
            console.err(e)
          }
        )
    }
  }
}
</script>

<style>
#container {
  display: flex;
  min-height: 100vh;
}

#input-area {
  min-height: 100vh;
  width: 30vw;
  font-size: 1rem;
}

#osmdCanvas {
  width: 70vw;
}
</style>
