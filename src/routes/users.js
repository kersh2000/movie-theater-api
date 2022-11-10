const express = require('express');
const { body, validationResult } = require('express-validator');
const usersRouter = express.Router();
const { User } = require('../models/User');

usersRouter.use(express.json());

module.exports = usersRouter;