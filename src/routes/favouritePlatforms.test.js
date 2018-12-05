jest.mock('../contentfulClient');

const { deletePlatform, addPlatform } = require('./favouritePlatforms');
const { getEnvironment } = require('../contentfulClient');
const { favouritePlatformsDataDelete, favouritePlatformsDataAdd } = require('./__mocks__');

// I am testing only happy cases to save time, for production I would test all cases as well
it('deletes platform', async () => {
  getEnvironment.mockImplementation(() =>
    Promise.resolve({ getEntries: () => Promise.resolve(favouritePlatformsDataDelete) }));
  const platforms = await deletePlatform('9999', '5ZDQx5dW6cqweY26GqK8s6');
  expect(JSON.stringify(platforms)).toEqual('{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"rq9f9siz5b6e"}},"id":"13QaZGsSHgyAggqI22MQsW","type":"Entry","createdAt":"2018-12-05T10:32:38.993Z","updatedAt":"2018-12-05T19:34:40.188Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"createdBy":{"sys":{"type":"Link","linkType":"User","id":"7ykSMqxCfJyoulNng6Gro5"}},"updatedBy":{"sys":{"type":"Link","linkType":"User","id":"7ykSMqxCfJyoulNng6Gro5"}},"publishedCounter":7,"version":26,"publishedBy":{"sys":{"type":"Link","linkType":"User","id":"7ykSMqxCfJyoulNng6Gro5"}},"publishedVersion":25,"firstPublishedAt":"2018-12-05T10:32:39.389Z","publishedAt":"2018-12-05T19:34:40.188Z","contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"favouritePlatform"}}},"fields":{"userId":{"en-US":"9999"},"platform":{"en-US":[{"sys":{"type":"Link","linkType":"Entry","id":"6ymHMrgkH6q6WGggqQ2aMs"}}]}}}');
  /* eslint-disable  max-len */
});

it('adds platform', async () => {
  getEnvironment.mockImplementation(() =>
    Promise.resolve({ getEntries: () => Promise.resolve(favouritePlatformsDataAdd) }));
  const platforms = await addPlatform('9999', '5ZDQx5dW6cqweY26GqK8s6');
  expect(JSON.stringify(platforms)).toEqual('{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"rq9f9siz5b6e"}},"id":"13QaZGsSHgyAggqI22MQsW","type":"Entry","createdAt":"2018-12-05T10:32:38.993Z","updatedAt":"2018-12-05T19:34:40.188Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"createdBy":{"sys":{"type":"Link","linkType":"User","id":"7ykSMqxCfJyoulNng6Gro5"}},"updatedBy":{"sys":{"type":"Link","linkType":"User","id":"7ykSMqxCfJyoulNng6Gro5"}},"publishedCounter":7,"version":26,"publishedBy":{"sys":{"type":"Link","linkType":"User","id":"7ykSMqxCfJyoulNng6Gro5"}},"publishedVersion":25,"firstPublishedAt":"2018-12-05T10:32:39.389Z","publishedAt":"2018-12-05T19:34:40.188Z","contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"favouritePlatform"}}},"fields":{"userId":{"en-US":"9999"},"platform":{"en-US":[{"sys":{"type":"Link","linkType":"Entry","id":"6ymHMrgkH6q6WGggqQ2aMs"}},{"sys":{"id":"5ZDQx5dW6cqweY26GqK8s6","linkType":"Entry","type":"Link"}}]}}}');
  /* eslint-disable  max-len */
});
