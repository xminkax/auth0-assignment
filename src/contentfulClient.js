/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.
const contentful = require('contentful-management');
const error = require('./error');

const LOCALE = 'en-US';
const SPACE_ID = 'rq9f9siz5b6e';
const FAVOURITE_PLATFORM = 'favouritePlatform';
const PLATFORM = 'platform';
const ACCESS_TOKEN = 'CFPAT-566889042ed4f8f07944d66086b3b5dd2dde9600c45cdfc2cc3fb9d937dfc4d1';
const ENVIRONMENT = 'master';

const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
});

const getEnvironment = async () => {
  const space = await client.getSpace(SPACE_ID);
  return space.getEnvironment(ENVIRONMENT);
};

const addUser = async (userId, platform) => {
  const environment = await getEnvironment();

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

const addFavouritePlatform = async (userId, platformId) => {
  const platform = {
    sys: {
      id: platformId,
      linkType: 'Entry',
      type: 'Link',
    },
  };
  const environment = await getEnvironment();
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
    throw new error.Exception(error.ERROR_TYPES.CONFLICT, 'Item already exists');
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

const deleteFavouritePlatform = async (userId, platformId) => {
  const environment = await getEnvironment();
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

const mapPlatform = ({ fields, sys }) => {
  const { title, imageName } = fields;
  const { id } = sys;
  return { title: title[LOCALE], imageName: imageName[LOCALE], id };
};

const getFavouritePlatforms = async (userId) => {
  const environment = await getEnvironment();
  const entries = await environment.getEntries({
    content_type: FAVOURITE_PLATFORM,
    'fields.userId': userId,
  });
  if (!entries.items || !entries.items[0]) {
    throw new error.Exception(error.ERROR_TYPES.NOT_FOUND, 'User doesn\'t exist');
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
  return favouritePlatforms.items.map(mapPlatform);
};

const getPlatforms = async () => {
  const environment = await getEnvironment();
  const entries = await environment.getEntries({
    content_type: PLATFORM,
  });
  return entries.items.map(mapPlatform);
};


module.exports = {
  deleteFavouritePlatform,
  addFavouritePlatform,
  getFavouritePlatforms,
  getPlatforms,
};
