const express = require('express');
const usersRouter = express.Router();
const { User, Show } = require('../models');
const validUser = require('../middleware/validUser');

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll();
  res.status(200).send({users: users});
});

usersRouter.get('/:id', validUser, async (req, res) => {
  res.status(200).send(req.user);
});

usersRouter.get('/:id/shows', validUser, async (req, res) => {
  const shows = await req.user.getShows();
  if (shows) {
    res.status(200).send({shows: shows});
  } else {
    res.status(404).send("Could not find shows.");
  }
});

usersRouter.put('/:id/shows/:showId', validUser, async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.showId);
    show.setUser(req.user);
    res.status(200).send(`'${show.title}' has been successfully watched by user ${req.user.username}.`);
  } catch (error) {
    res.status(404).send(error);
  }
  
});

module.exports = usersRouter;