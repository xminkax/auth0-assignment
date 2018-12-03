/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.
const express = require('express');
const contentful = require('contentful');

const app = express();

const client = contentful.createClient({
  space: 'rq9f9siz5b6e',
  accessToken: '6806b20c28f79aecd70bb6001f46bc02063b527019835e1777db7fe8acdbb2ed'
});

const mapPlatform = ({fields}) => {
  const {title, imageName} = fields;
  return {title, imageName}
};

const FAVOURITE_PLATFORM = 'favouritePlatform';
const PLATFORM = 'platform';

app.get('/platforms', async (req, res) => {
  res.send({});
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});


