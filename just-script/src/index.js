const fs = require('fs')
const path = require('path')

const { Lexer } = require('./lexer')

const fileName = 'generic.just'

const source = fs
  .readFileSync(path.join(__dirname, `../examples/${fileName}`))
  .toString()

const lexer = new Lexer(source)

console.log(lexer.tokenize())
