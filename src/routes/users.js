const express = require('express');
const { body, validationResult } = require('express-validator');
const usersRouter = express.Router();
const { User } = require('../models/User');

usersRouter.use(express.json());

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

module.exports = usersRouter;