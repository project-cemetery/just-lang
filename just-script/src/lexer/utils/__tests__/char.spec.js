const {
  isDigit,
  isLetter,
  isWhitespaceOrNewLine,
  isNewLine,
  isUnderscore,
} = require('../char')

describe('isDigit', () => {
  it('should recognize a digits string', () => {
    expect(isDigit('12354')).toBeTruthy()
  })

  it('should not recognize a string with not digits chars', () => {
    expect(isDigit('fd12354')).toBeFalsy()
    expect(isDigit('12354fd')).toBeFalsy()
    expect(isDigit('fdexand')).toBeFalsy()
    expect(isDigit('12354.1')).toBeFalsy()
  })
})

describe('isLetter', () => {
  it('should recognize a letters string', () => {
    expect(isLetter('hello')).toBeTruthy()
  })

  it('should not recognize a string with not letter chars', () => {
    expect(isLetter('fd12354')).toBeFalsy()
    expect(isLetter('12354fd')).toBeFalsy()
    expect(isLetter('1235431')).toBeFalsy()
    expect(isLetter('12354.1')).toBeFalsy()
  })
})

describe('isWhitespaceOrNewLine', () => {
  it('should recognize a whitespace or newline string', () => {
    expect(isWhitespaceOrNewLine(' ')).toBeTruthy()
    expect(isWhitespaceOrNewLine('\n')).toBeTruthy()
  })

  it('should not recognize a string with not accepted chars', () => {
    expect(isWhitespaceOrNewLine('fd12354')).toBeFalsy()
    expect(isWhitespaceOrNewLine('12354fd')).toBeFalsy()
    expect(isWhitespaceOrNewLine('fdexand')).toBeFalsy()
    expect(isWhitespaceOrNewLine('1235431')).toBeFalsy()
    expect(isWhitespaceOrNewLine('12354.1')).toBeFalsy()
  })
})

describe('isNewLine', () => {
  it('should recognize a whitespace or newline string', () => {
    expect(isNewLine('\n')).toBeTruthy()
  })

  it('should not recognize a string with not accepted chars', () => {
    expect(isNewLine('fd12354')).toBeFalsy()
    expect(isNewLine('12354fd')).toBeFalsy()
    expect(isNewLine('fdexand')).toBeFalsy()
    expect(isNewLine('1235431')).toBeFalsy()
    expect(isNewLine('12354.1')).toBeFalsy()
    expect(isNewLine(' ')).toBeFalsy()
  })
})

describe('isUnderscore', () => {
  it('should recognize a underscore', () => {
    expect(isUnderscore('_')).toBeTruthy()
  })

  it('should not recognize a string with not accepted chars', () => {
    expect(isUnderscore('fd12354')).toBeFalsy()
    expect(isUnderscore('12354fd')).toBeFalsy()
    expect(isUnderscore('fdexand')).toBeFalsy()
    expect(isUnderscore('1235431')).toBeFalsy()
    expect(isUnderscore('12354.1')).toBeFalsy()
    expect(isUnderscore(' ')).toBeFalsy()
    expect(isUnderscore('_12')).toBeFalsy()
  })
})
