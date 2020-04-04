const usersRepo = require('./user.memory.repository');

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

const remove = id => usersRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
