jest.mock('../contentfulClient');

const { getPlatforms } = require('./platforms');
const { getEnvironment } = require('../contentfulClient');
const { platformsData } = require('./__mocks__');

getEnvironment.mockImplementation(() =>
  Promise.resolve({ getEntries: () => Promise.resolve(platformsData) }));

// I am testing only happy case to save time, for production I would test all cases as well
it('returns platforms', async () => {
  const platforms = await getPlatforms();
  expect(JSON.stringify(platforms)).toEqual('[{"title":"test","imageName":"test","id":"kd2AXxjFu0KYI8QSQCO8Y"},{"title":"Angular 2+","imageName":"angular","id":"5ZDQx5dW6cqweY26GqK8s6"},{"title":"AngularJs","imageName":"angular","id":"662lRdvU6AKOG6AkQKY2eU"},{"title":"Android","imageName":"android","id":"6ymHMrgkH6q6WGggqQ2aMs"}]');
});
