const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (board) {
    res.status(200).json(Board.toResponse(board));
  } else {
    res.status(404).json(`Board with id ${req.params.id} not found`);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);
  res.status(200).json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  if (board) {
    res.status(200).json(Board.toResponse(board));
  } else {
    res.status(404).json(`Board with id ${req.params.id} not found`);
  }
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardsService.remove(req.params.id);
  if (board) {
    res.status(204).json(`Board with id ${req.params.id} has been deleted`);
  } else {
    res.status(404).json(`Board with id ${req.params.id} not found`);
  }
});

module.exports = router;
