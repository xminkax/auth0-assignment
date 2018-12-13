const contentfulClient = require('../contentfulClient');
const util = require('./util');
const { PLATFORM } = require('./contentTypes');

const { LOCALE } = contentfulClient;

const CacheService = require('../cache');

const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl);

const getPlatforms = async () => {
  if (cache.get('platforms')) {
    return cache.get('platforms');
  }

  const environment = await contentfulClient.getEnvironment();
  const entries = await environment.getEntries({
    content_type: PLATFORM,
    order: 'fields.title',
  });
  const mapPlatformWithLocale = util.mapPlatform(LOCALE);

  const result = entries.items.map(mapPlatformWithLocale);
  cache.set('platforms', result);
  return result;
};

module.exports = {
  getPlatforms,
};
