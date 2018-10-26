const express = require('express');
const usersController = require('../controllers/users.controller');
const auth = require('../utils/auth');

var usersRouter = express.Router();

usersRouter
  .route('/')
  .post(auth.optional, usersController.create);

usersRouter
  .route('/current')
  .get(auth.required, usersController.current);

usersRouter
  .route('/login')
  .post(auth.optional, usersController.login);

module.exports = usersRouter;