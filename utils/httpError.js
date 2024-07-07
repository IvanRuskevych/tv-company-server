const errorMessageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};

module.exports.httpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);

  error.status = status;

  return error;
};
