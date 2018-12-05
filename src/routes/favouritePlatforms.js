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
  return entry.update();
};

const deletePlatform = async (userId, platformId) => {
  const environment = await contentfulClient.getEnvironment();
  const entries = await environment.getEntries({
    content_type: FAVOURITE_PLATFORM,
    'fields.userId': userId,
  });
  const entry = entries.items[0];

  if (!entry.fields.platform) {
    return { message: 'Nothing to delete' };
  }

  const platforms = [];
  entry.fields.platform[LOCALE].forEach((item) => {
    if (item.sys.id !== platformId) {
      platforms.push(item);
    }
  });

  if (platforms.length === 0) {
    delete entry.fields.platform;
  } else {
    entry.fields.platform[LOCALE] = platforms;
  }

  return entry.update();
};

const getPlatforms = async (userId) => {
  const environment = await contentfulClient.getEnvironment();
  const entries = await environment.getEntries({
    content_type: FAVOURITE_PLATFORM,
    'fields.userId': userId,
  });
  if (!entries.items || !entries.items[0]) {
    throw new Exception(NOT_FOUND, 'User doesn\'t exist');
  }
  if (!entries.items[0].fields.platform) {
    return [];
  }
  const platforms = entries.items[0].fields.platform[LOCALE];
  const favouritePlatformsId = platforms.map(({ sys }) => sys.id);

  const favouritePlatforms = await environment.getEntries({
    content_type: PLATFORM,
    'sys.id[in]': favouritePlatformsId.join(','),
  });
  const mapPlatformWithLocale = util.mapPlatform(LOCALE);
  return favouritePlatforms.items.map(mapPlatformWithLocale);
};

module.exports = {
  deletePlatform,
  addPlatform,
  getPlatforms,
};
