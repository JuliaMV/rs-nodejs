const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  console.log('user', user);
  if (user) {
    res.status(200).json(user.map(User.toResponse));
  } else {
    res.status(404).json(`User with id ${req.params.id} not found`);
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res.status(200).json('The user has been deleted');
});

module.exports = router;
