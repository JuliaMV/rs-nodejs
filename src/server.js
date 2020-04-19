const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
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

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We are connected to MongoDB');
  db.dropDatabase();
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
