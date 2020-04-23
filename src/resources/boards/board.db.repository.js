const { checkIsExist } = require('../../utils');

const Board = require('./board.model');

const checkIsExistBoard = (q, id) => checkIsExist(q, id, 'Board');

const getAll = async () => {
  const q = Board.find({});
  return await q;
};

const getById = async id => {
  const q = Board.findById(id);
  return await checkIsExistBoard(q, id);
};

const create = async ({ title, columns }) => {
  const q = Board.create({ title, columns });
  return await q;
};

const update = async ({ id, title, columns }) => {
  const q = Board.findByIdAndUpdate(id, { title, columns });
  return await checkIsExistBoard(q, id);
};

const remove = async id => {
  const q = Board.findByIdAndDelete(id);
  return await checkIsExistBoard(q, id);
};

module.exports = { getAll, getById, create, update, remove };
