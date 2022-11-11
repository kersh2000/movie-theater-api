const express = require('express');
const { body, validationResult } = require('express-validator');
const showsRouter = express.Router();
const { Show } = require('../models/Show');
const validShow = require('../middleware/validShow');

showsRouter.use(express.json());

showsRouter.get('/', async (req, res) => {
  const shows = await Show.findAll();
  res.status(200).send(shows);
});

showsRouter.get('/:id', validShow, async (req, res) => {
  res.status(200).send(req.show);
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

showsRouter.put('/:id/watched',
body('rating')
.not().isEmpty()
.withMessage('Rating must be provided.')
.custom(value => !/\s/.test(value))
.withMessage('Rating must not conatin any spaces.'),
validShow, 
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send(errors);
  }
  await req.show.update({
    rating: req.body.rating
  });
  res.status(200).send(`Show ${req.params.id} successfully updated.`);
});

showsRouter.put('/:id/updates/:custom'
, 
validShow, async (req, res) => {
  const arr = ['cancelled', 'on-going'];
  if (req.params.custom === 'true') {
    await req.show.update({
      status: (arr[1 - arr.indexOf(req.show.status)])
    });
    res.status(200).send(`Successfully changed status of show ${req.params.id}`);
  } else {

  }
});

showsRouter.delete('/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    await show.destroy();
    res.status(200).send(`Show ${req.params.id} successfully deleted.`);
  } catch (error) {
    res.status(404).send(`Failed to delete show ${req.params.id}.`);
  }
});

module.exports = showsRouter;