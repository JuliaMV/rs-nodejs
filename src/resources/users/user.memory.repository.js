const createError = require('http-errors');

const User = require('./user.model');

let users = [];

const getAll = async () => {
  return users;
};

const getById = async id => {
  const user = users.find(item => item.id === id);
  if (!user) {
    throw new createError.NotFound(`User with id ${id} not found`);
  }
  return user;
};

const create = async ({ name, login, password }) => {
  const user = new User({ name, login, password });
  users.push(user);
  return user;
};

const update = async ({ id, name, login, password }) => {
  const user = await getById(id);
  user.name = name;
  user.login = login;
  user.password = password;
  return user;
};

const remove = async id => {
  const user = await getById(id);
  users = users.filter(item => item.id !== id);
  return user;
};

module.exports = { getAll, getById, create, update, remove };
