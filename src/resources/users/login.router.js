const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('./user.model');

const { JWT_SECRET_KEY } = require('../../common/config');
const jwt = require('jsonwebtoken');

const { catchError } = require('../../middlewares');

const loginCb = async (req, res) => {
  const {
    body: { login, password }
  } = req;

  const user = await User.findOne({ login });
  if (!user) {
    res.status(403).send('Forbiden');
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  console.log('isCorrect', isCorrect);

  if (!isCorrect) {
    return res.status(400).json({ message: 'Password is not correct' });
  }

  const token = jwt.sign(
    { userId: user.id, login: user.login },
    JWT_SECRET_KEY,
    { expiresIn: '1h' }
  );
  res.json({ token, userId: user.id });

  res.status(200).send();
};

module.exports = Router().post('/', catchError(loginCb));
