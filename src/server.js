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

app.get('/favourite-platforms/:id', async (req, res) => {
  try {
    const response = await client.getEntries({
      content_type: FAVOURITE_PLATFORM,
      'fields.userId': req.params.id
    });
    const result = response.items[0].fields.platform.map(mapPlatform);
    res.send(JSON.stringify(result));
  } catch (error) {
    res.status(500);
    res.send(JSON.stringify({error}));
  }
});

app.get('/platforms', async (req, res) => {
    try {
      const response = await client.getEntries({content_type: PLATFORM});
      debugger;
      const result = response.items.map(mapPlatform);
      res.send(JSON.stringify(result));
    } catch (error) {
      res.status(500);
      res.send(JSON.stringify({error}));
    }
  }
);

app.listen(process.env.PORT || 4000, () => {
  console.log('Node server listening on http://localhost:4000');
});


