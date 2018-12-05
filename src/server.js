/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.
const express = require('express');
const contentfulClient = require('./contentfulClient');
const error = require('./error');
const paramsValidator = require('./paramsValidator');

const app = express();
app.use(express.json());

const sendError = (err, res) => {
  const errorData = error.httpHandler(err);
  res.statusCode = errorData.statusCode;
  res.send(JSON.stringify(errorData.text));
};

app.post('/favourite-platform', async (req, res) => {
  try {
    paramsValidator.favouritePlatform(req.body);
    const entry = await contentfulClient.addFavouritePlatform(req.body.userId, req.body.platformId);
    res.send(JSON.stringify(entry));
  } catch (err) {
    sendError(err, res);
  }
});

app.delete('/favourite-platform', async (req, res) => {
  try {
    paramsValidator.favouritePlatform(req.body);
    const entry = await contentfulClient.deleteFavouritePlatform(
      req.body.userId,
      req.body.platformId,
    );
    res.send(JSON.stringify(entry));
  } catch (err) {
    sendError(err, res);
  }
});

app.get('/favourite-platforms/:userId', async (req, res) => {
  try {
    const favouritePlatforms = await contentfulClient.getFavouritePlatforms(req.params.userId);
    res.send(JSON.stringify(favouritePlatforms));
  } catch (err) {
    sendError(err, res);
  }
});

app.get('/platforms', async (req, res) => {
  try {
    const platforms = await contentfulClient.getPlatforms();
    res.send(JSON.stringify(platforms));
  } catch (err) {
    sendError(err, res);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Node server listening on http://localhost:4000');
});

