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

showsRouter.get('/genres/:genre', async (req, res) => {
  try {
    const shows = await Show.findAll({
      where: {
        genre: req.params.genre
      }
    });
    res.status(200).send(shows);
  } catch (error) {
    res.status(404).send(error);
  }
});

showsRouter.put('/:id/watched', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    await show.update({
      rating: req.body.rating
    });
    res.status(200).send(`Show ${req.params.id} successfully updated.`);
  } catch (error) {
    res.status(404).send(`Could not update rating to show ${req.params.id}.`)
  }
});

module.exports = showsRouter;