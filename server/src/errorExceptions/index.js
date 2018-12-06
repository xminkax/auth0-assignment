const ERROR_TYPES = require('./errorTypes');

function Exception(type, message) {
  this.type = type;
  this.message = message;

  this.textMessage = () => ({ errorType: this.type, errorMessage: this.message });
}

const httpHandler = (error) => {
  let statusCode;
  switch (error.type) {
    case ERROR_TYPES.BAD_REQUEST:
      statusCode = 400;
      break;
    case ERROR_TYPES.NOT_FOUND:
      statusCode = 404;
      break;
    case ERROR_TYPES.CONFLICT:
      statusCode = 409;
      break;
    default:
      statusCode = 500;
  }

  return {
    text: error.type ? error.textMessage() : ERROR_TYPES.INTERNAL_SERVER_ERROR,
    statusCode,
  };
};

module.exports = {
  httpHandler,
  Exception,
};
