# music-dsl
UBC CPSC 410 domain-specific language project

## Prerequisite
[Yarn](https://yarnpkg.com) - Package manager for Javascript

## Setup
Install project dependencies
```
yarn install
```
Serve with hot reload at localhost:3000
```
yarn dev
```
Build for production and launch server
```
yarn build
yarn start
```
Generate static project
```
yarn generate
```

## EBNF
```
PROGRAM      ::= TITLE SECTION* PRINT
PRINT        ::= “ -> ” “{“ [REPEAT, (SECTION (“,” SECTION)*)]+ “}”
SECTION      ::= STRING “ <- ” “{“ CLEF KEY TIME TEMPO CHORD+ “}”
REPEAT       ::= “REPEAT” SECTION (“, ” SECTION)* INTEGER
CLEF         ::= [“Treble”, “Bass”, “Alto”]
KEY          ::= NOTE QUALITY
TIME         ::= [1-9]+ / 2k, k > 0
TEMPO        ::= “TEMPO” STRING
CHORD        ::= NOTE (“, ” NOTE)* “, ” DURATION (“, “ DYNAMIC)? (“, ” ARTICULATION)*
NOTE         ::= [“C”, “D”, “E”, “F”, “G”, “A”, “B”] MODIFIER? [0-9]
MODIFIER     ::= [“#”, “b”]
QUALITY      ::= [“major”, “minor”]
ARTICULATION ::= ["staccato", "tenuto", "marcato", "accent", "begin slur", "end slur"]
DYNAMIC      ::= ["ppp", "pp", "p", "mp", "mf", "fp", "fz", "rf", "rfz", "sf", "f", "ff", "fff", "begin crescendo", "end crescendo", "begin decrescendo", "end decrescendo", "begin diminuendo", "end diminuendo"]
DURATION     ::= "dotted-"? ["whole", "half", "quarter", "eighth", "16th", "32nd", "64th", "128th"]
```

## Example grammar
Samples available in `samples` folder

## Built with
- [Nuxt.js](https://nuxtjs.org/) - The Vue.js Framework
- [Bootstrap Vue](https://bootstrap-vue.js.org/) - Bootstrap v4 implementation for Vue.js

## Disclaimer
`music-dsl` should be used for educational purposes only. No exceptions. Team "We Just Met" and developers will not be responsible or liable in any way for use of this project. No liability or responsibility is accepted by the developers and associates. User discretion is advised.