const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { JWT_SECRET_KEY } = require('../common/config');
const User = require('../resources/users/user.model');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new createError.Unauthorized('Not authorized');
    }

    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      throw new createError.Unauthorized('Not authorized');
    }

    const data = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findOne({ _id: data.userId, token });
    if (!user) {
      throw new createError.Unauthorized('Not authized');
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = auth;
