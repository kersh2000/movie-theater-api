const express = require('express');
const { body, validationResult } = require('express-validator');
const showsRouter = express.Router();
const { Show } = require('../models/Show');

showsRouter.use(express.json());

showsRouter.get('/', async (req, res) => {
  const shows = await Show.findAll();
  res.status(200).send(shows);
});

module.exports = showsRouter;