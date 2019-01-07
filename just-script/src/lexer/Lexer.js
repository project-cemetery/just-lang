const { Token } = require('./Token')
const { TokenType, Operators, Delimiters, Keywords } = require('./TokenType')
const { isNewLine, isDigit } = require('./utils/char')
const { StringFSM } = require('./FSM/StringFSM')
const { NumberFSM } = require('./FSM/NumberFSM')

const isValidCommonIdentifier = char => /[a-z_$]/i.test(char)
const isValidSymbolicIdentifier = char =>
  '<>+-*&^!@#$%|'.split('').includes(char)
const isValidInIdentifier = char =>
  isValidCommonIdentifier(char) || isValidSymbolicIdentifier(char)

class Lexer {
  constructor(input) {
    this.input = input
    this.position = 0
    this.line = 0
    this.column = 0
  }

  tokenize() {
    const tokens = []
    let token = this.nextToken()

    while (token.type !== TokenType.EndOfInput) {
      tokens.push(token)
      token = this.nextToken()
    }

    return tokens
  }

  currentState() {
    return { position: this.position, line: this.line, column: this.column }
  }

  updateState(lineOffset = 0, columnOffset = 0, positionOffset = 0) {
    this.line = this.line + lineOffset
    this.column = columnOffset < 0 ? 0 : this.column + columnOffset
    this.position = this.position + positionOffset
  }

  recognizeNewLine() {
    const { line, column } = this.currentState()
    this.updateState(1, -1, 1)
    return new Token(TokenType.Newline, '\n', line, column)
  }

  recognizeIdentifier() {
    const { position, line, column } = this.currentState()
    const foundChars = []
    let char = this.input.charAt(position + foundChars.length)

    while (isValidInIdentifier(char) || isDigit(char)) {
      foundChars.push(char)
      char = this.input.charAt(position + foundChars.length)
    }

    this.updateState(0, foundChars.length, foundChars.length)
    const value = foundChars.join('')
    const type = Keywords.hasValue(value) ? value : TokenType.Identifier
    return new Token(type, value, line, column)
  }

  recognizeString() {
    const { position, line, column } = this.currentState()
    const fsm = new StringFSM()
    const { value } = fsm.run(this.input.substring(position))
    this.updateState(0, value.length, value.length)
    return new Token(TokenType.String, value, line, column)
  }

  recognizeNumber() {
    const { line, column } = this.currentState()
    const fsm = new NumberFSM()
    const { recognized, value, state } = fsm.run(
      this.input.substring(this.position),
    )

    if (recognized) {
      this.updateState(0, value.length, value.length)
      const type =
        state === fsm.states.Integer ? TokenType.Integer : TokenType.Decimal

      return new Token(type, value, line, column)
    }

    return undefined
  }

  recognizeToken(type, value) {
    const token = new Token(type, value, this.line, this.column)
    const len = value.length
    this.updateState(0, len, len)
    return token
  }

  lookAhead() {
    return this.input.charAt(this.position + 1)
  }

  nextChar() {
    return this.input.charAt(this.position)
  }

  ignoreSpaces() {
    let char = this.nextChar()
    while (char === ' ') {
      this.updateState(0, 1, 1)
      char = this.nextChar()
    }
    return char
  }

  nextToken() {
    if (this.position >= this.input.length) {
      return new Token(TokenType.EndOfInput)
    }

    const character = this.ignoreSpaces()

    if (
      isDigit(character) ||
      (character === '.' && isDigit(this.lookAhead()))
    ) {
      return this.recognizeNumber()
    }

    if (character === '"') {
      return this.recognizeString()
    }

    if (isNewLine(character)) {
      return this.recognizeNewLine()
    }

    if (Operators.hasValue(character + this.lookAhead())) {
      const value = character + this.lookAhead()
      const token = new Token(value, value, this.line, this.column)
      this.updateState(0, 2, 2)
      return token
    }

    if (Operators.hasValue(character)) {
      return this.recognizeToken(character, character)
    }

    if (Delimiters.hasValue(character)) {
      return this.recognizeToken(character, character)
    }

    if (isValidInIdentifier(character)) {
      return this.recognizeIdentifier()
    }

    throw new Error(
      `Unrecognized character "${character}" at line ${this.line} and column ${
        this.column
      }.`,
    )
  }
}

module.exports = {
  Lexer,
}
