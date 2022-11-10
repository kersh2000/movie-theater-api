const express = require('express');
const { body, validationResult } = require('express-validator');
const showsRouter = express.Router();
const { Show } = require('../models/Show');

showsRouter.use(express.json());

showsRouter.get('/', async (req, res) => {
  const shows = await Show.findAll();
  res.status(200).send(shows);
});

showsRouter.get('/:id', async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (show) {
    res.status(200).send(show);
  } else {
    res.status(404).send("Could not find show.");
  }
});



module.exports = showsRouter;