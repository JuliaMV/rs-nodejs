const catchError = require('./catchError');
const logParams = require('./logParams');
const logError = require('./logError');
const errorHandler = require('./errorHandler');
const notFound = require('./notFound');
const auth = require('./auth');

module.exports = {
  catchError,
  logParams,
  errorHandler,
  notFound,
  logError,
  auth
};
