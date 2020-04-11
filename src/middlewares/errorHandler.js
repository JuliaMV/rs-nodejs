const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.statusCode) {
      res.status(err.statusCode).send(err.message);
    } else {
      console.error('ERROR: from errorHandler', err.message);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send(getStatusText(INTERNAL_SERVER_ERROR));
    }
  }
};

module.exports = errorHandler;
