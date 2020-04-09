const { Router } = require('express');
const Task = require('./task.model');
const tasksService = require('./task.service');

const getAllTasks = async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAllByBoard(boardId);
  res.status(200).json(tasks.map(Task.toResponse));
};

const getTaskById = async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (task) {
    res.status(200).json(Task.toResponse(task));
  } else {
    res.status(404).json(`Task with id ${req.params.id} not found`);
  }
};

const createTask = async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create(boardId, req.body);
  res.status(200).json(Task.toResponse(task));
};

const updateTask = async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  if (task) {
    res.status(200).json(Task.toResponse(task));
  } else {
    res.status(404).json(`Task with id ${req.params.id} not found`);
  }
};

const deleteTask = async (req, res) => {
  const task = await tasksService.remove(req.params.id);
  if (task) {
    res.status(204).json(`Task with id ${req.params.id} has been deleted`);
  } else {
    res.status(404).json(`Task with id ${req.params.id} not found`);
  }
};

module.exports = Router({ mergeParams: true })
  .get('/', getAllTasks)
  .get('/:id', getTaskById)
  .post('/', createTask)
  .put('/:id', updateTask)
  .delete('/:id', deleteTask);
