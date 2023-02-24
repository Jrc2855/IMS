'use strict';

const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Base Endpoint Proof of life');
});

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};