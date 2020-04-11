const createError = require('http-errors');

const Task = require('./task.model');

let tasks = [];

const getAllByBoard = async boardId => {
  return tasks.filter(item => item.boardId === boardId);
};

const getById = async id => {
  const task = tasks.find(item => item.id === id);
  if (!task) {
    throw new createError.NotFound(`Task with id ${id} not found`);
  }
  return task;
};

const create = async ({
  title,
  order,
  description,
  userId,
  columnId,
  boardId
}) => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  });
  tasks.push(task);
  return task;
};

const update = async ({
  id,
  title,
  order,
  description,
  userId,
  columnId,
  boardId
}) => {
  const task = await getById(id);
  task.title = title;
  task.columns = order;
  task.description = description;
  task.userId = userId;
  task.columnIds = columnId;
  task.boardIds = boardId;
  return task;
};

const remove = async id => {
  const task = await getById(id);
  tasks = tasks.filter(item => item.id !== id);
  return task;
};

const unassign = async userId => {
  tasks.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
  return;
};

const deleteAllByBoard = async boardId => {
  tasks = tasks.filter(item => item.boardId !== boardId);
  return;
};

module.exports = {
  getAllByBoard,
  getById,
  create,
  update,
  remove,
  unassign,
  deleteAllByBoard
};
