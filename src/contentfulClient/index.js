const contentful = require('contentful-management');

const SPACE_ID = 'rq9f9siz5b6e';
const LOCALE = 'en-US';
const ACCESS_TOKEN = 'CFPAT-566889042ed4f8f07944d66086b3b5dd2dde9600c45cdfc2cc3fb9d937dfc4d1';
const ENVIRONMENT = 'master';

const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
});

const getEnvironment = async () => {
  const space = await client.getSpace(SPACE_ID);
  return space.getEnvironment(ENVIRONMENT);
};

module.exports = {
  getEnvironment,
  LOCALE,
};
