<template>
  <div id="container">
    <div>
      <img id='banner' src='./music-dsl-banner.png'>
    </div>
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

      <p id='status'>No Errors</p>

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
import scripts from '~/pages/scripts.js'
export default scripts
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

#banner {
  margin-left: auto;
  margin-right: auto;
  width: 25%;
  display: block;
}
</style>
