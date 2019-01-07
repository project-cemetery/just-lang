const { reverse, fromArrays } = require('../object')

describe('reverse', () => {
  it('should reverse a simple object', () => {
    const original = {
      key: 'value',
    }

    const reversed = {
      value: 'key',
    }

    expect(reverse(original)).toEqual(reversed)
  })
})

describe('fromArrays', () => {
  it('should create a object from arrays', () => {
    const keys = ['key1', 'key2']
    const values = ['value1', 'value2']

    const obj = {
      key1: 'value1',
      key2: 'value2',
    }

    expect(fromArrays(keys, values)).toEqual(obj)
  })
})
