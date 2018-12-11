/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.
const express = require('express');
const favouritePlatforms = require('./routes/favouritePlatforms');
const platforms = require('./routes/platforms');
const error = require('./errorExceptions');
const validators = require('./validators');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const sendError = (err, res) => {
  const errorData = error.httpHandler(err);
  res.statusCode = errorData.statusCode;
  res.send(JSON.stringify(errorData.text));
};

app.post('/favourite-platform', async (req, res) => {
  try {
    validators.favouritePlatform(req.body);
    const response = await favouritePlatforms.addPlatform(req.body.userId, req.body.platformId);
    res.send(JSON.stringify(response));
  } catch (err) {
    sendError(err, res);
  }
});

app.delete('/favourite-platform', async (req, res) => {
  try {
    validators.favouritePlatform(req.body);
    const response = await favouritePlatforms.deletePlatform(
      req.body.userId,
      req.body.platformId,
    );
    res.send(JSON.stringify(response));
  } catch (err) {
    sendError(err, res);
  }
});

app.get('/favourite-platforms/:userId', async (req, res) => {
  try {
    const response = await favouritePlatforms.getPlatforms(req.params.userId);
    res.send(JSON.stringify(response));
  } catch (err) {
    sendError(err, res);
  }
});

app.get('/platforms', async (req, res) => {
  try {
    const response = await platforms.getPlatforms();

    res.send(JSON.stringify(response));
  } catch (err) {
    sendError(err, res);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Node server listening on http://localhost:4000');
});

