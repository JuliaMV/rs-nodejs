const createError = require('http-errors');

const notFound = (req, res, next) => {
  return next(new createError.NotFound('Not found'));
};

module.exports = notFound;
