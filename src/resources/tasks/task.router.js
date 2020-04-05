const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const boardsService = require('../boards/board.service');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;

  const board = await boardsService.getById(boardId);
  if (board) {
    const tasks = await tasksService.getAllByBoard(req.params.boardId);
    res.status(200).json(tasks.map(Task.toResponse));
  } else {
    res.status(404).json(`Board with id ${req.params.id} not found`);
  }
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (task) {
    res.status(200).json(Task.toResponse(task));
  } else {
    res.status(404).json(`Task with id ${req.params.id} not found`);
  }
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const task = await tasksService.create(boardId, req.body);
  res.status(200).json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  if (task) {
    res.status(200).json(Task.toResponse(task));
  } else {
    res.status(404).json(`Task with id ${req.params.id} not found`);
  }
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.id);
  res.status(200).json(`Task with id ${req.params.id} has been deleted`);
});

module.exports = router;
