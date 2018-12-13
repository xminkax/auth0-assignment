const contentfulClient = require('../contentfulClient');
const util = require('./util');
const { Exception } = require('../errorExceptions');
const { CONFLICT, NOT_FOUND } = require('../errorExceptions/errorTypes');
const { PLATFORM, FAVOURITE_PLATFORM } = require('./contentTypes');

const { LOCALE } = contentfulClient;

const addUser = async (userId, platform) => {
  const environment = await contentfulClient.getEnvironment();

  const entry = await environment.createEntry(FAVOURITE_PLATFORM, {
    fields: {
      userId: {
        [LOCALE]: userId,
      },
      platform: {
        [LOCALE]: [platform],
      },
    },
  });
  return entry.publish();
};

const addPlatform = async (userId, platformId) => {
  const platform = {
    sys: {
      id: platformId,
      linkType: 'Entry',
      type: 'Link',
    },
  };
  const environment = await contentfulClient.getEnvironment();
  const entries = await environment.getEntries({
    content_type: FAVOURITE_PLATFORM,
    'fields.userId': userId,
  });

  if (entries.items.length === 0) {
    return addUser(userId, platform);
  }

  const entry = entries.items[0];
  const platforms = entry.fields.platform ?
    entry.fields.platform :
    entry.fields.platform = { [LOCALE]: [] };
  const find = platforms[LOCALE].find(item => item.sys.id === platformId);
  if (find) {
    throw new Exception(CONFLICT, 'Item already exists');
  }
  platforms[LOCALE].push({
    sys: {
      id: platformId,
      linkType: 'Entry',
      type: 'Link',
    },
  });
  entry.fields.platform = platforms;
  await entry.update();
  return entry;
};

const deletePlatform = async (userId, platformId) => {
  const environment = await contentfulClient.getEnvironment();
  const entries = await environment.getEntries({
    content_type: FAVOURITE_PLATFORM,
    'fields.userId': userId,
  });
  const entry = entries.items[0];

  if (!entry.fields.platform) {
    throw new Exception(NOT_FOUND, 'Item not found');
  }

  const existingPlatforms = entry.fields.platform[LOCALE];
  const platformsAfterDelete = [];
  existingPlatforms.forEach((item) => {
    if (item.sys.id !== platformId) {
      platformsAfterDelete.push(item);
    }
  });

  if (platformsAfterDelete.length === 0) {
    delete entry.fields.platform;
  } else if (existingPlatforms.length === platformsAfterDelete.length) {
    throw new Exception(NOT_FOUND, 'Item not found');
  } else {
    entry.fields.platform[LOCALE] = platformsAfterDelete;
  }

  await entry.update();
  return entry;
};

const getPlatforms = async (userId) => {
  const environment = await contentfulClient.getEnvironment();
  const entries = await environment.getEntries({
    content_type: FAVOURITE_PLATFORM,
    'fields.userId': userId,
  });
  if (!entries.items || !entries.items[0] || !entries.items[0].fields.platform) {
    return [];
  }
  const platforms = entries.items[0].fields.platform[LOCALE];
  const favouritePlatformsId = platforms.map(({ sys }) => sys.id);

  const favouritePlatforms = await environment.getEntries({
    content_type: PLATFORM,
    'sys.id[in]': favouritePlatformsId.join(','),
    order: 'fields.title',
  });
  const mapPlatformWithLocale = util.mapPlatform(LOCALE);
  return favouritePlatforms.items.map(mapPlatformWithLocale);
};

module.exports = {
  deletePlatform,
  addPlatform,
  getPlatforms,
};
