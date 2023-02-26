'use strict';
// 3rd party libraries
const express = require('express');
const cors = require('cors');
// error handlers
const notFoundHandler = require('../src/error-handlers/404');
const errorHandler = require('../src/error-handlers/500');
// middleware
const logger = require('./middleware/logger');
const authRoutes = require('../src/auth/routes');
const v1Routes = require('../src/routes/v1');


const app = express();


app.use(cors());
app.use(express.json());
app.use(logger);
app.use(authRoutes);
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