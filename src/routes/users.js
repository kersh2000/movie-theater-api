const express = require('express');
const { body, validationResult } = require('express-validator');
const usersRouter = express.Router();
const { User, Show } = require('../models');

usersRouter.use(express.json());

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("Could not find user.");
  }
});

usersRouter.get('/:id/shows', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const shows = await user.getShows();
  if (shows) {
    res.status(200).send(shows);
  } else {
    res.status(404).send("Could not find shows.");
  }
})

usersRouter.put('/:id/shows/:showId', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.showId);
    await show.update({
      userId: req.params.id
    });
    res.status(200).send(`Show ${req.params.showId} successfully watched by user ${req.params.id}`);
  } catch (erorr) {
    res.status(404).send(error);
  }
  
});

module.exports = usersRouter;