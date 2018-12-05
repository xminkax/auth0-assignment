const contentfulClient = require('../contentfulClient');
const util = require('./util');
const { PLATFORM } = require('./contentTypes');

const { LOCALE } = contentfulClient;

const getPlatforms = async () => {
  const environment = await contentfulClient.getEnvironment();
  const entries = await environment.getEntries({
    content_type: PLATFORM,
  });
  const mapPlatformWithLocale = util.mapPlatform(LOCALE);
  return entries.items.map(mapPlatformWithLocale);
};

module.exports = {
  getPlatforms,
};
