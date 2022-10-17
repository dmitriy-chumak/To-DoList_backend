const validationText = (text) => {
  return (text.trim() === '');
}

const validationIsCheck = (isCheck) => {
  return (typeof(isCheck) === 'boolean');
}

module.exports = {
  validationText,
  validationIsCheck,
}