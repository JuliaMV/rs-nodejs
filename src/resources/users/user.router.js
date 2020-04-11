const { Router } = require('express');

const { catchError } = require('../../middlewares');
const User = require('./user.model');
const usersService = require('./user.service');

const getAllUsers = async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
};

const getUserById = async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.status(200).json(User.toResponse(user));
};

const createUser = async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(200).json(User.toResponse(user));
};

const updateUser = async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.status(200).json(User.toResponse(user));
};

const deleteUser = async (req, res) => {
  await usersService.remove(req.params.id);
  res.status(204).json(`User with id ${req.params.id} has been deleted`);
};

module.exports = Router()
  .get('/', catchError(getAllUsers))
  .get('/:id', catchError(getUserById))
  .post('/', catchError(createUser))
  .put('/:id', catchError(updateUser))
  .delete('/:id', catchError(deleteUser));
