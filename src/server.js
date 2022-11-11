//Import express package locally installed
const express = require('express');
const app = express();
const port = 3000;
const { usersRouter, showsRouter } = require('./routes');
const seed = require('./db/seed');

app.use(express.json());

app.use('/users', usersRouter);
app.use('/shows', showsRouter);

app.get('/seed', async(req, res) => {
  await seed();
  res.status(200).send('Database has been re-populated.');
});

//Allows app to listen on given port, so it can be queried
app.listen(port, async () => {
  console.log(`Listening on port ${port}...`)
});