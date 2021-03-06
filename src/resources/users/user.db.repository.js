const { checkIsExist, generateHash } = require('../../utils');

const User = require('./user.model');

const checkIsExistUser = (q, id) => checkIsExist(q, id, 'User');

const getAll = async () => {
  const q = User.find({});
  return await q;
};

const getById = async id => {
  const q = User.findById(id);
  return await checkIsExistUser(q, id);
};

const create = async ({ name, login, password }) => {
  const q = User.create({ name, login, password });
  return await q;
};

const update = async ({ id, name, login, password }) => {
  const hashedPassword = await generateHash(password);
  const q = User.findByIdAndUpdate(id, {
    name,
    login,
    password: hashedPassword
  });
  return await checkIsExistUser(q, id);
};

const remove = async id => {
  const q = User.findByIdAndDelete(id);
  return await checkIsExistUser(q, id);
};

const findByLogin = async login => {
  const user = await User.findOne({ login });
  return user;
};

module.exports = { getAll, getById, create, update, remove, findByLogin };
