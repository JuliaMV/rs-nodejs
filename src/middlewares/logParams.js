const { finished } = require('stream');

const logParams = (req, res, next) => {
  const { method, url, body, query } = req;
  const start = Date.now();

  // eslint-disable-next-line callback-return
  next();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    console.log(
      `${method} ${url} ${JSON.stringify(query)} ${JSON.stringify(
        body
      )} ${statusCode} [${ms}ms]`
    );
  });
};

module.exports = logParams;
