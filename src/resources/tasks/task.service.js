const tasksRepo = require('./task.db.memory.repository');

const getAllByBoard = boardId => tasksRepo.getAllByBoard(boardId);

const getById = id => tasksRepo.getById(id);

const create = (boardId, params) => {
  const { title, order, description, userId, columnId } = params;
  return tasksRepo.create({
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  });
};

const update = (id, params) => {
  const { title, order, description, userId, columnId, boardId } = params;
  return tasksRepo.update({
    id,
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  });
};

const remove = id => tasksRepo.remove(id);

const unassign = userId => tasksRepo.unassign(userId);

const deleteAllByBoard = boardId => tasksRepo.deleteAllByBoard(boardId);

module.exports = {
  getAllByBoard,
  getById,
  create,
  update,
  remove,
  unassign,
  deleteAllByBoard
};
