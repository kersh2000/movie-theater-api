const express = require('express');
const usersRouter = express.Router();
const { User, Show } = require('../models');
const validUser = require('../middleware/validUser');

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

usersRouter.get('/:id', validUser, async (req, res) => {
  res.status(200).send(req.user);
});

usersRouter.get('/:id/shows', validUser, async (req, res) => {
  const shows = await req.user.getShows();
  if (shows) {
    res.status(200).send(shows);
  } else {
    res.status(404).send("Could not find shows.");
  }
})

usersRouter.put('/:id/shows/:showId', validUser, async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.showId);
    await show.update({
      userId: req.params.id
    });
    res.status(200).send(`Show ${req.params.showId} successfully watched by user ${req.params.id}.`);
  } catch (error) {
    res.status(404).send(error);
  }
  
});

module.exports = usersRouter;