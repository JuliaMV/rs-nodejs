const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = params => {
  const { name, login, password } = params;
  return usersRepo.create({ name, login, password });
};

const update = (id, params) => {
  const { name, login, password } = params;
  return usersRepo.update({ id, name, login, password });
};

const remove = async id => {
  await tasksService.unassign(id);
  return usersRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
