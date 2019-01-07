const { FlatMap } = require('./utils/FlatMap')

const Operators = new FlatMap({
  Equal: '=',
  RightArrow: '->',
  Dot: '.',
})

const Delimiters = new FlatMap({
  Colon: ':',
  Comma: ',',
  LeftBrace: '{',
  LeftParen: '(',
  LeftBracket: '[',
  Newline: '\n',
  RightBrace: '}',
  RightParen: ')',
  RightBracket: ']',
})

const Keywords = new FlatMap({
  Interface: 'interface',
  Class: 'class',
  Implements: 'implements',
  Else: 'else',
  False: 'false',
  If: 'if',
  Let: 'let',
  New: 'new',
  Private: 'private',
  This: 'this',
  True: 'true',
})

const TokenType = {
  ...Operators.object,
  ...Delimiters.object,
  ...Keywords.object,
  ...{
    // Identifier and Literals
    Identifier: 'identifier',
    Integer: 'integer',
    Decimal: 'decimal',
    String: 'string',

    // Special token types
    EndOfInput: 'EndOfInput',
    Unrecognized: 'Unrecognized',
  },
}

module.exports = {
  Operators,
  Delimiters,
  Keywords,
  TokenType,
}
