const boardsRepo = require('./board.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = params => {
  const { title, columns } = params;
  return boardsRepo.create({ title, columns });
};

const update = (id, params) => {
  const { title, columns } = params;
  return boardsRepo.update({ id, title, columns });
};

const remove = async id => {
  await tasksService.deleteAllByBoard(id);
  return boardsRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
