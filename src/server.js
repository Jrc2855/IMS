'use strict';

const express = require('express');
const logger = require('./middleware/logger');
const notFoundHandler = ('./error-handlers/404.js');
const errorHandler = ('./error-handler/500.js');

const v1Routes = require('../src/routes/v1');


const app = express();



app.use(express.json());
app.use(logger);
app.use('/api/v1', v1Routes);

app.get('/', (req, res) => {
  res.status(200).send('Base Endpoint Proof of life');
});





app.use('*', notFoundHandler);
app.use(errorHandler);


module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};