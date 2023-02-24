'use strict';

module.exports = (req, res, next) => {
  res.statu(400).send({
    error: 404,
    route: req.baseUrl,
    message: 'Not Found',
  });
};