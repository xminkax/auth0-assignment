/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.
const express = require('express');
const contentfulClient = require('./contentfulClient');

const app = express();
app.use(express.json());

app.post('/favourite-platform', async (req, res) => {
  const entry = await contentfulClient.addFavouritePlatform(req.body.userId, req.body.platformId);
  res.send(JSON.stringify(entry));
});

app.delete('/favourite-platform', async (req, res) => {
  const entry = await contentfulClient.deleteFavouritePlatform(
    req.body.userId,
    req.body.platformId,
  );
  res.send(JSON.stringify(entry));
});

app.get('/favourite-platforms/:userId', async (req, res) => {
  const favouritePlatforms = await contentfulClient.getFavouritePlatforms(req.params.userId);
  res.send(favouritePlatforms);
});

app.get('/platforms', async (req, res) => {
  const platforms = await contentfulClient.getPlatforms();
  res.send(JSON.stringify(platforms));
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Node server listening on http://localhost:4000');
});

