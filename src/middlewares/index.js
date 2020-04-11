const catchError = require('./catchError');
const logParams = require('./logParams');
const logError = require('./logError');
const errorHandler = require('./errorHandler');
const notFound = require('./notFound');

module.exports = {
  catchError,
  logParams,
  errorHandler,
  notFound,
  logError
};
