const bcrypt = require('bcrypt');
const createError = require('http-errors');
const usersRepo = require('./user.db.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const findByLogin = async (login, password) => {
  const user = await usersRepo.findByLogin(login);
  if (!user) {
    throw new createError.Forbidden(`User with ${login} doesn't exist`);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new createError.Unauthorized(`User with ${login} doesn't authorized`);
  }
  return user;
};

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

module.exports = { getAll, getById, create, update, remove, findByLogin };
