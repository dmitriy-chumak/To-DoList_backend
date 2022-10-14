const validationText = (text) => {
  return (text.trim() === false);
}

const validationIsCheck = (isCheck) => {
  return (typeof(isCheck) !== 'boolean');
}

module.exports = {
  validationText,
  validationIsCheck,
}