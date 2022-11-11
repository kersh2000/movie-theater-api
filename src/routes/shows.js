const express = require('express');
const showsRouter = express.Router();
const { Show } = require('../models/Show');
const validShow = require('../middleware/validShow');
const { body, validationResult } = require('express-validator');
const findGenre = require('../findGenre');

showsRouter.use(express.json());

showsRouter.get('/', async (req, res) => {
  const shows = await Show.findAll();
  res.status(200).send(shows);
});

showsRouter.get('/:id', validShow, async (req, res) => {
  res.status(200).send(req.show);
});

showsRouter.get('/genres/:genre', validGenre, async (req, res) => {
  const genre = req.params.genre;
  const shows = await Show.findAll({
    where: {
      genre: genre
    }
  });
  if (shows.length === 0) {
    const match = await findGenre(genre)
    res.status(404).send(`Genre ${genre} cannot be found.\n${match}`);
  } else {
    res.status(200).send(shows);
  }
});

showsRouter.put('/:id/watched',
body('rating')
.notEmpty()
.withMessage('Rating must be provided.')
.custom(value => !/\s/.test(value))
.withMessage('Rating must not conatin any spaces.'),
validShow, 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).send(errors);
  }
  await req.show.update({
    rating: req.body.rating
  });
  res.status(200).send(`Show ${req.params.id} successfully updated.`);
});

showsRouter.put('/:id/updates/', validShow, async (req, res) => {
  const arr = ['cancelled', 'on-going'];
  await req.show.update({
    status: (arr[1 - arr.indexOf(req.show.status)])
  });
  res.status(200).send(`Successfully changed status of show ${req.params.id}`);
});

showsRouter.delete('/:id', validShow, async (req, res) => {
  try {
    await req.show.destroy();
    res.status(200).send(`Show ${req.show.title} successfully deleted.`);
  } catch (error) {
    res.status(404).send(`Failed to delete show ${req.params.id}.`);
  }
});

module.exports = showsRouter;