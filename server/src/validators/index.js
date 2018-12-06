const error = require('../errorExceptions');
const { BAD_REQUEST } = require('../errorExceptions/errorTypes');

const favouritePlatform = (params) => {
  if (!params.userId || !params.platformId) {
    throw new error.Exception(BAD_REQUEST, 'Wrong parameters');
  }
};

module.exports = {
  favouritePlatform,
};
