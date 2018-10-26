const express = require('express');
const usersRouter = require('./users.router');
const songRouter = require('./song.router');

const router = express.Router();

router.use('/api/users', usersRouter);
router.use('/api/songs', songRouter);

module.exports = router;