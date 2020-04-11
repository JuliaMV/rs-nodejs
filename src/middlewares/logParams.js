const logger = require('../logger');

const logParams = (req, res, next) => {
  const { url, body, query } = req;
  logger.log({ level: 'info', message: JSON.stringify({ url, query, body }) });
  next();
};

module.exports = logParams;
