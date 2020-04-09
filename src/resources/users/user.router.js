const { Router } = require('express');
const User = require('./user.model');
const usersService = require('./user.service');

const getAllUsers = async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
};

const getUserById = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    res.status(404).json(`User with id ${req.params.id} not found`);
  }
};

const createUser = async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(200).json(User.toResponse(user));
};

const updateUser = async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    res.status(404).json(`User with id ${req.params.id} not found`);
  }
};

const deleteUser = async (req, res) => {
  const user = await usersService.remove(req.params.id);
  if (user) {
    res.status(204).json(`User with id ${req.params.id} has been deleted`);
  } else {
    res.status(404).json(`User with id ${req.params.id} not found`);
  }
};

module.exports = Router()
  .get('/', getAllUsers)
  .get('/:id', getUserById)
  .post('/', createUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser);
