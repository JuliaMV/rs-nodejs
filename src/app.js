const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const { logParams, errorHandler, notFound } = require('./middlewares');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/task.router');

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

process.on('uncaughtException', error => {
  console.error(`captured error: ${error.message}`);
  const exit = process.exit;
  exit(1);
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logParams);

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
app.use('*', notFound);

app.use(errorHandler);

// For testing uncaughtException

// setTimeout(() => {
//   throw new Error('Oops1!');
// }, 1500);

// For testing unhandledRejection

// setTimeout(() => {
//   Promise.reject(new Error('Oops2!'));
// }, 1500);

// new Promise(() => { throw new Error('Catch rejected'); });
// throw new Error('Catch me!');

module.exports = app;
