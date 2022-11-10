//Import express package locally installed
const express = require('express');
const app = express();
const port = 5000;
const { usersRouter, showsRouter } = require('./routes');
const seed = require('./db/seed');

app.use(express.json());

app.use('/users', usersRouter);
app.use('/shows', showsRouter);

//Allows app to listen on given port, so it can be queried
app.listen(port, async () => {
  await seed();
  console.log(`Listening on port ${port}...`)
});