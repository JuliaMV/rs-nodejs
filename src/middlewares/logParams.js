const { finished } = require('stream');
const logger = require('../logger');

const logParams = (req, res, next) => {
  const { method, url, body, query } = req;
  const start = Date.now();

  // eslint-disable-next-line callback-return
  next();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.log({
      level: 'info',
      message: `url: ${url} query: ${JSON.stringify(
        query
      )} body: ${JSON.stringify(body)}`,
      additional: `method: ${method} status: ${statusCode} duration: ${ms}ms`
    });
  });
};

module.exports = logParams;
