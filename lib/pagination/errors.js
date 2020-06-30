const customError = message => new Error(message);

exports.invalidPageNumberError = () => {
  const error = customError('The page number must be an integer greater than 0');
  error.name = 'InvalidPageNumber';
  Error.captureStackTrace(error, exports.invalidPageNumberError);
  return error;
};

exports.invalidLimitNumberError = () => {
  const error = customError('The limit number must be an integer greater than 0');
  error.name = 'InvalidLimitNumber';
  Error.captureStackTrace(error, exports.invalidLimitNumberError);
  return error;
};

exports.invalidContentTypeError = () => {
  const error = customError('The content must be an Array');
  error.name = 'InvalidContentType';
  Error.captureStackTrace(error, exports.invalidContentTypeError);
  return error;
};
