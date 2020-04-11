const { Router } = require('express');

const { catchError } = require('../../middlewares');
const Board = require('./board.model');
const boardsService = require('./board.service');

const getAllBoards = async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards.map(Board.toResponse));
};

const getBoardById = async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  res.status(200).json(Board.toResponse(board));
};

const createBoard = async (req, res) => {
  const board = await boardsService.create(req.body);
  res.status(200).json(Board.toResponse(board));
};

const updateBoard = async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.status(200).json(Board.toResponse(board));
};

const deleteBoard = async (req, res) => {
  await boardsService.remove(req.params.id);
  res.status(204).send(`Board with id ${req.params.id} has been deleted`);
};

module.exports = Router()
  .get('/', catchError(getAllBoards))
  .get('/:id', catchError(getBoardById))
  .post('/', catchError(createBoard))
  .put('/:id', catchError(updateBoard))
  .delete('/:id', catchError(deleteBoard));
