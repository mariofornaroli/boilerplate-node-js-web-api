const express = require('express');
const songController = require('../controllers/song.controller');

const auth = require('../utils/auth');

// export const songRouter = express.Router();

var songRouter = express.Router();

songRouter
  .route('/')
  .post(songController.create)
  .get(auth.required, songController.findAll);

songRouter
  .route('/:id')
  .get(auth.required, songController.findOne)
  .delete(auth.required, songController.delete)
  .put(songController.update);

  module.exports = songRouter;