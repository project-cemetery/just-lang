const { TokenType } = require('../TokenType')
const { Lexer } = require('../Lexer')

describe('Lexer', () => {
  describe('#nextToken', () => {
    it('should recognize a newline character as a single token', () => {
      const lexer = new Lexer('\n')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Newline)
      expect(token.type).toBe('\n')
    })

    it('should recognize the number 0', () => {
      const lexer = new Lexer('0')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Integer)
      expect(token.value).toBe('0')
    })

    it('should recognize a simple integer literal', () => {
      const lexer = new Lexer('42')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Integer)
      expect(token.value).toBe('42')
    })

    it('should recognize a simple decimal literal', () => {
      const lexer = new Lexer('3.14')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Decimal)
      expect(token.value).toBe('3.14')
    })

    it('should recognize a decimal starting with dot (.)', () => {
      const lexer = new Lexer('.25')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Decimal)
      expect(token.value).toBe('.25')
    })

    it('should recognize a decimal in scientific notation', () => {
      const lexer = new Lexer('2e65')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Decimal)
      expect(token.value).toBe('2e65')
    })

    it('should recognize a decimal in scientific notation with negative exponent part', () => {
      const lexer = new Lexer('42e-65')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Decimal)
      expect(token.value).toBe('42e-65')
    })

    it('should recognize a simple string literal', () => {
      const lexer = new Lexer('"Hello, World!"')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.String)
      expect(token.value).toBe('"Hello, World!"')
    })

    it('should recognize a string containing a newline character', () => {
      const lexer = new Lexer('"a string containing a \\n newline character."')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.String)
      expect(token.value).toBe('"a string containing a \\n newline character."')
    })

    it('should recognize a string containing an espaced backslash', () => {
      const lexer = new Lexer('"a string with a \\\\ backslash"')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.String)
      expect(token.value).toBe('"a string with a \\\\ backslash"')
    })

    it('should recognize a string containing escaped double quotes', () => {
      const lexer = new Lexer(
        '"a string containing an \\" escaped double quote"',
      )

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.String)
      expect(token.value).toBe(
        '"a string containing an \\" escaped double quote"',
      )
    })

    it('should recognize a string containing escape sequences', () => {
      const lexer = new Lexer(
        '"a string containing \\t\\b\\r\\f\\v\\0 escape sequences"',
      )

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.String)
      expect(token.value).toBe(
        '"a string containing \\t\\b\\r\\f\\v\\0 escape sequences"',
      )
    })

    it('should recognize the boolean true literal', () => {
      const lexer = new Lexer('true')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.True)
      expect(token.value).toBe('true')
    })

    it('should recognize the boolean false literal', () => {
      const lexer = new Lexer('false')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.False)
      expect(token.value).toBe('false')
    })

    it('should recognize an identifier of a single letter', () => {
      const lexer = new Lexer('i')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Identifier)
      expect(token.value).toBe('i')
    })

    it('should recognize an identifier made of letters', () => {
      const lexer = new Lexer('anIdentifier')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Identifier)
      expect(token.value).toBe('anIdentifier')
    })

    it('should recognize an identifier starting with underscore (_)', () => {
      const lexer = new Lexer('_identifier')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Identifier)
      expect(token.value).toBe('_identifier')
    })

    it('should recognize an identifier containing an underscore (_)', () => {
      const lexer = new Lexer('an_identifier')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Identifier)
      expect(token.value).toBe('an_identifier')
    })

    it('should recognize an identifier containing a $ character', () => {
      const lexer = new Lexer('an$identifier')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Identifier)
      expect(token.value).toBe('an$identifier')
    })

    it('should recognize an identifier containing a digit', () => {
      const lexer = new Lexer('identifier1')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Identifier)
      expect(token.value).toBe('identifier1')
    })

    it('should recognize the abstract keyword', () => {
      const lexer = new Lexer('interface')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Interface)
      expect(token.value).toBe('interface')
    })

    it('should recognize the class keyword', () => {
      const lexer = new Lexer('class')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Class)
      expect(token.value).toBe('class')
    })

    it('should recognize the else keyword', () => {
      const lexer = new Lexer('else')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Else)
      expect(token.value).toBe('else')
    })

    it('should recognize the extends keyword', () => {
      const lexer = new Lexer('implements')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Implements)
      expect(token.value).toBe('implements')
    })

    it('should recognize the false keyword', () => {
      const lexer = new Lexer('false')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.False)
      expect(token.value).toBe('false')
    })

    it('should recognize the if keyword', () => {
      const lexer = new Lexer('if')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.If)
      expect(token.value).toBe('if')
    })

    it('should recognize the let keyword', () => {
      const lexer = new Lexer('let')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Let)
      expect(token.value).toBe('let')
    })

    it('should recognize the new keyword', () => {
      const lexer = new Lexer('new')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.New)
      expect(token.value).toBe('new')
    })

    it('should recognize the private keyword', () => {
      const lexer = new Lexer('private')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Private)
      expect(token.value).toBe('private')
    })

    it('should recognize the this keyword', () => {
      const lexer = new Lexer('this')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.This)
      expect(token.value).toBe('this')
    })

    it('should recognize the true keyword', () => {
      const lexer = new Lexer('true')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.True)
      expect(token.value).toBe('true')
    })

    it('should recognize an identifier starting with a reserved keyword', () => {
      const lexer = new Lexer('classString')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Identifier)
      expect(token.value).toBe('classString')
    })

    it('should recognize the dispatch (.) operator', () => {
      const lexer = new Lexer('.')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Dot)
      expect(token.value).toBe('.')
    })

    it('should recognize the equal (=) operator', () => {
      const lexer = new Lexer('=')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Equal)
      expect(token.value).toBe('=')
    })

    it('should recognize the right arrow (->) operator', () => {
      const lexer = new Lexer('->')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.RightArrow)
      expect(token.value).toBe('->')
    })

    it('should recognize a colon (:)', () => {
      const lexer = new Lexer(':')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Colon)
      expect(token.value).toBe(':')
    })

    it('should recognize a comma (,)', () => {
      const lexer = new Lexer(',')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.Comma)
      expect(token.value).toBe(',')
    })

    it('should recognize a left brace ({)', () => {
      const lexer = new Lexer('{')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.LeftBrace)
      expect(token.value).toBe('{')
    })

    it('should recognize a right brace (})', () => {
      const lexer = new Lexer('}')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.RightBrace)
      expect(token.value).toBe('}')
    })

    it('should recognize a left bracket ([)', () => {
      const lexer = new Lexer('[')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.LeftBracket)
      expect(token.value).toBe('[')
    })

    it('should recognize a right bracket (])', () => {
      const lexer = new Lexer(']')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.RightBracket)
      expect(token.value).toBe(']')
    })

    it('should recognize a left parenthesis (()', () => {
      const lexer = new Lexer('(')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.LeftParen)
      expect(token.value).toBe('(')
    })

    it('should recognize a right parenthesis ())', () => {
      const lexer = new Lexer(')')

      const token = lexer.nextToken()

      expect(token.type).toBe(TokenType.RightParen)
      expect(token.value).toBe(')')
    })
  })

  describe('#tokenize', () => {
    it('should properly tokenize a full function definition', () => {
      const lexer = new Lexer('let add = (a: Int, b: Int): Int -> a + b')
      const tokens = lexer.tokenize()

      expect(tokens).toHaveLength(18)

      expect(tokens[0].type).toBe(TokenType.Let)

      expect(tokens[1].type).toBe(TokenType.Identifier)
      expect(tokens[1].value).toBe('add')

      expect(tokens[2].type).toBe(TokenType.Equal)

      expect(tokens[3].type).toBe(TokenType.LeftParen)

      expect(tokens[4].type).toBe(TokenType.Identifier)
      expect(tokens[4].value).toBe('a')

      expect(tokens[5].type).toBe(TokenType.Colon)

      expect(tokens[6].type).toBe(TokenType.Identifier)
      expect(tokens[6].value).toBe('Int')

      expect(tokens[7].type).toBe(TokenType.Comma)

      expect(tokens[8].type).toBe(TokenType.Identifier)
      expect(tokens[8].value).toBe('b')

      expect(tokens[9].type).toBe(TokenType.Colon)

      expect(tokens[10].type).toBe(TokenType.Identifier)
      expect(tokens[10].value).toBe('Int')

      expect(tokens[11].type).toBe(TokenType.RightParen)

      expect(tokens[12].type).toBe(TokenType.Colon)

      expect(tokens[13].type).toBe(TokenType.Identifier)
      expect(tokens[13].value).toBe('Int')

      expect(tokens[14].type).toBe(TokenType.RightArrow)

      expect(tokens[15].type).toBe(TokenType.Identifier)
      expect(tokens[15].value).toBe('a')

      expect(tokens[16].type).toBe(TokenType.Identifier)
      expect(tokens[16].value).toBe('+')

      expect(tokens[17].type).toBe(TokenType.Identifier)
      expect(tokens[17].value).toBe('b')
    })

    it('should tokenize a simple expression with plus method', () => {
      const lexer = new Lexer('42 + 21')
      const tokens = lexer.tokenize()

      expect(tokens).toHaveLength(3)
      expect(tokens[0].type).toBe(TokenType.Integer)
      expect(tokens[0].value).toBe('42')
      expect(tokens[1].type).toBe(TokenType.Identifier)
      expect(tokens[1].value).toBe('+')
      expect(tokens[2].type).toBe(TokenType.Integer)
      expect(tokens[2].value).toBe('21')
    })

    it('should tokenize a simple expression with or method', () => {
      const lexer = new Lexer('true || isCorrect')
      const tokens = lexer.tokenize()

      expect(tokens).toHaveLength(3)
      expect(tokens[0].type).toBe(TokenType.True)

      expect(tokens[1].type).toBe(TokenType.Identifier)
      expect(tokens[1].value).toBe('||')

      expect(tokens[2].type).toBe(TokenType.Identifier)
      expect(tokens[2].value).toBe('isCorrect')
    })

    it('should tokenize a simple expression with less than method', () => {
      const lexer = new Lexer('12 < length')
      const tokens = lexer.tokenize()

      expect(tokens).toHaveLength(3)
      expect(tokens[0].type).toBe(TokenType.Integer)
      expect(tokens[0].value).toBe('12')

      expect(tokens[1].type).toBe(TokenType.Identifier)
      expect(tokens[1].value).toBe('<')

      expect(tokens[2].type).toBe(TokenType.Identifier)
      expect(tokens[2].value).toBe('length')
    })

    it('should tokenize a simple expression with minus than method', () => {
      const lexer = new Lexer('12 - size')
      const tokens = lexer.tokenize()

      expect(tokens).toHaveLength(3)
      expect(tokens[0].type).toBe(TokenType.Integer)
      expect(tokens[0].value).toBe('12')

      expect(tokens[1].type).toBe(TokenType.Identifier)
      expect(tokens[1].value).toBe('-')

      expect(tokens[2].type).toBe(TokenType.Identifier)
      expect(tokens[2].value).toBe('size')
    })
  })
})
