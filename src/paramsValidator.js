const error = require('./error');

const favouritePlatform = (params) => {
  if(!params.userId || !params.platformId) {
    throw new error.Exception(error.ERROR_TYPES.BAD_REQUEST, 'Wrong parameters');
  }
};

module.exports = {
  favouritePlatform
};
