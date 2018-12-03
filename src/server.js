/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.
const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/todo', (req, res) => {
  res.send({});
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
