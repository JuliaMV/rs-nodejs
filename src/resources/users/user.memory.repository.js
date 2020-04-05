const User = require('./user.model');

let users = [];

const getAll = async () => {
  return users;
};

const getById = async id => {
  const user = users.find(item => item.id === id);
  return user;
};

const create = async ({ name, login, password }) => {
  const user = new User({ name, login, password });
  users.push(user);
  return user;
};

const update = async ({ id, name, login, password }) => {
  const user = users.find(item => item.id === id);
  if (user) {
    if (name) user.name = name;
    if (login) user.login = login;
    if (password) user.password = password;
  }
  return user;
};

const remove = async id => {
  const user = users.find(item => item.id === id);
  if (user) {
    users = users.filter(item => item.id !== id);
  }
  return null;
};

module.exports = { getAll, getById, create, update, remove };
