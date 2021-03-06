const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const {
  logParams,
  errorHandler,
  notFound,
  logError,
  auth
} = require('./middlewares');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/boards/board.router');
const tasksRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login.router');

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

app.use('/login', loginRouter);
app.use('/users', auth, userRouter);
app.use('/boards', auth, boardsRouter);
boardsRouter.use('/:boardId/tasks', auth, tasksRouter);
app.use('*', auth, notFound);
app.use(logError);
app.use(errorHandler);

module.exports = app;
