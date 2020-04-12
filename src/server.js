const { PORT } = require('./common/config');
const logger = require('./logger');

const exit = process.exit;

process
  .on('unhandledRejection', reason => {
    logger.log('error', `Unhandled rejection detected: ${reason.message}`);
    exit(1);
  })
  .on('uncaughtException', error => {
    logger.log('error', `Captured error: ${error.message}`);
    exit(1);
  });

const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
