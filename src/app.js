const express = require('express');
const { finished } = require('stream');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  const { method, url, body, params } = req;
  const start = Date.now();

  // eslint-disable-next-line callback-return
  next();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    console.log(
      `${method} ${url} ${JSON.stringify(params)} ${JSON.stringify(
        body
      )} ${statusCode} [${ms}ms]`
    );
  });
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardsRouter);
boardsRouter.use('/:boardId/tasks', tasksRouter);

app.use((err, req, res) => {
  if (err) {
    console.log('ERROR:', err);
  }
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

process.on('uncaughtException', error => {
  console.error(`captured error: ${error.message}`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

module.exports = app;
