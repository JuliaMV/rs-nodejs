const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getAllByBoard(boardId);
  res.status(200).json(tasks.map(Task.toResponse));
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
  const task = await tasksService.remove(req.params.id);
  if (task) {
    res.status(204).json(`Task with id ${req.params.id} has been deleted`);
  } else {
    res.status(404).json(`Task with id ${req.params.id} not found`);
  }
});

module.exports = router;
