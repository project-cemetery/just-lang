const fromArrays = (keys, values) =>
  keys.reduce(
    (result, k, index) => ({
      ...result,
      [k]: values[index],
    }),
    {},
  )

const reverse = obj => fromArrays(Object.values(obj), Object.keys(obj))

module.exports = {
  reverse,
  fromArrays,
}
