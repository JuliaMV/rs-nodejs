const { Router } = require('express');
const User = require('./users/user.model');
const usersService = require('./users/user.service');

const { catchError } = require('../middlewares');

const login = async (req, res) => {
  const { body } = req;
  const user = await usersService.findByLogin(body.login, body.password);

  const token = await user.generateAuthToken();
  res.status(200).json({ user: User.toResponse(user), token });
};

module.exports = Router().post('/', catchError(login));
