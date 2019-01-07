const isDigit = x => /^[0-9]+$/.test(x)
const isLetter = x => /^[a-z]+$/i.test(x)
const isWhitespaceOrNewLine = x => /[ \n]/.test(x)
const isNewLine = x => x === '\n'
const isUnderscore = x => x === '_'

module.exports = {
  isDigit,
  isLetter,
  isWhitespaceOrNewLine,
  isNewLine,
  isUnderscore,
}
