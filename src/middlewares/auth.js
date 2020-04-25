const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const auth = (req, res, next) => {
  // const token = req.header('Authorization').replace('Bearer ', '')
  // const data = jwt.verify(token, JWT_SECRET_KEY)

  //   try {
  //       const user = await User.findOne({ _id: data._id, 'tokens.token': token })
  //       if (!user) {
  //           throw new Error()
  //       }
  //       req.user = user
  //       req.token = token
  //       next()
  //   } catch (error) {
  //       res.status(401).send({ error: 'Not authorized to access this resource' })
  //   }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorization' });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (e) {
    res.status(401).json({ message: 'Not authorization' });
  }
};

module.exports = auth;
