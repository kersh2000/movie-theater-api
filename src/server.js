//Import express package locally installed
const express = require('express');
const app = express();
const port = 5000;
const { usersRouter, showsRouter } = require('./routes');
const db = require('./db/db');

app.use(express.json());

//Allows app to listen on given port, so it can be queried
app.listen(port, async () => {
  await db.sync();
  console.log(`Listening on port ${port}...`)
});