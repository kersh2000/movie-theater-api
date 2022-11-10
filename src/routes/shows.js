const express = require('express');
const { body, validationResult } = require('express-validator');
const showsRouter = express.Router();
const { Show } = require('../models/Show');

showsRouter.use(express.json());

module.exports = showsRouter;