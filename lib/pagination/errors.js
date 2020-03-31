const customError = message => new Error(message);

exports.invalidPageNumberError = () => {
  const error = customError('Invalid Page Number');
  error.name = 'InvalidPageNumber';
  Error.captureStackTrace(error, exports.invalidPageNumberError);
  return error;
};

exports.invalidLimitNumberError = () => {
  const error = customError('Invalid Limit Number');
  error.name = 'InvalidLimitNumber';
  Error.captureStackTrace(error, exports.invalidLimitNumberError);
  return error;
};
