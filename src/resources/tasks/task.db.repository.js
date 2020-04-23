const { checkIsExist } = require('../../utils');

const Task = require('./task.model');

const checkIsExistTask = (q, id) => checkIsExist(q, id, 'Task');

const getAllByBoard = async boardId => {
  const q = Task.find({ boardId });
  return await q;
};

const getById = async id => {
  const q = Task.findById(id);
  return await checkIsExistTask(q, id);
};

const create = async ({
  title,
  order,
  description,
  userId,
  columnId,
  boardId
}) => {
  const q = Task.create({
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  });
  return await q;
};

const update = async ({
  id,
  title,
  order,
  description,
  userId,
  columnId,
  boardId
}) => {
  const q = Task.findByIdAndUpdate(id, {
    title,
    order,
    description,
    userId,
    columnId,
    boardId
  });
  return await checkIsExistTask(q, id);
};

const remove = async id => {
  const q = Task.findByIdAndDelete(id);
  return await checkIsExistTask(q, id);
};

const unassign = async userId => {
  const q = Task.updateMany({ userId }, { userId: null });
  return await q;
};

const deleteAllByBoard = async boardId => {
  const q = Task.deleteMany({ boardId });
  return (await q).deletedCount;
};

module.exports = {
  getAllByBoard,
  getById,
  create,
  update,
  remove,
  unassign,
  deleteAllByBoard
};
