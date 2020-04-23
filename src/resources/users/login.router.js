const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('./user.model');

const { catchError } = require('../../middlewares');

const loginCb = async (req, res) => {
  const {
    body: { login, password }
  } = req;

  if (login && password) {
    const user = await User.findOne({ login });
    const isCorrect = await bcrypt.compare(password, user.password);
    console.log('isCorrect', isCorrect);
  }

  res.status(200).send();
};

module.exports = Router().post('/', catchError(loginCb));
