const express = require('express');
const app = express();
const port = 3001;
const _ = require('lodash');

var gameMappings = require("./static/Games.json");
gameMappings = _.mapValues(gameMappings, game => ({...game, interestedPlayers: []}));

app.get('/games', (req, res) => {
  res.send(gameMappings);
})

app.post('/games', (req, res) => {
  let { body: {gameMappings} } = req;
  gameMappings = gameMappings;
  res.send("okay");
})

app.listen(port);