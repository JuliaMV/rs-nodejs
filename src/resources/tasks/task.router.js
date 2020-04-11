const { Router } = require('express');

const { catchError } = require('../../middlewares');
const Task = require('./task.model');
const tasksService = require('./task.service');

const getAllTasks = async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAllByBoard(boardId);
  res.status(200).json(tasks.map(Task.toResponse));
};

const getTaskById = async (req, res) => {
  const task = await tasksService.getById(req.params.id);

  res.status(200).json(Task.toResponse(task));
};

const createTask = async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create(boardId, req.body);
  res.status(200).json(Task.toResponse(task));
};

const updateTask = async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  res.status(200).json(Task.toResponse(task));
};

const deleteTask = async (req, res) => {
  await tasksService.remove(req.params.id);
  res.status(204).json(`Task with id ${req.params.id} has been deleted`);
};

module.exports = Router({ mergeParams: true })
  .get('/', catchError(getAllTasks))
  .get('/:id', catchError(getTaskById))
  .post('/', catchError(createTask))
  .put('/:id', catchError(updateTask))
  .delete('/:id', catchError(deleteTask));
