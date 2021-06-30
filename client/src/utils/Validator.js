export default {
  minLength(value, length) {
    return value.length < length ?
      1 : 0
  },
  maxLength(value, length) {
    return value.length > length ?
      1 : 0
  },
  validChar(value) {
    return !/^[0-9a-zA-Z]+$/.test(value) ?
      1 : 0
  },
  isNonEmpty(value) {
    return value === '' ?
      1 : 0
  }
}