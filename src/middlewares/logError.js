const logger = require('../logger');

const logError = (err, req, res, next) => {
  if (err) {
    logger.log({ level: 'error', message: err.message });
    return next(err);
  }
  return next();
};

module.exports = logError;
