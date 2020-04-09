const { Router } = require('express');
const Board = require('./board.model');
const boardsService = require('./board.service');

const getAllBoards = async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards.map(Board.toResponse));
};

const getBoardById = async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (board) {
    res.status(200).json(Board.toResponse(board));
  } else {
    res.status(404).json(`Board with id ${req.params.id} not found`);
  }
};

const createBoard = async (req, res) => {
  const board = await boardsService.create(req.body);
  res.status(200).json(Board.toResponse(board));
};

const updateBoard = async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  if (board) {
    res.status(200).json(Board.toResponse(board));
  } else {
    res.status(404).json(`Board with id ${req.params.id} not found`);
  }
};

const deleteBoard = async (req, res) => {
  const board = await boardsService.remove(req.params.id);
  if (board) {
    res.status(204).json(`Board with id ${req.params.id} has been deleted`);
  } else {
    res.status(404).json(`Board with id ${req.params.id} not found`);
  }
};

module.exports = Router()
  .get('/', getAllBoards)
  .get('/:id', getBoardById)
  .post('/', createBoard)
  .put('/:id', updateBoard)
  .delete('/:id', deleteBoard);
