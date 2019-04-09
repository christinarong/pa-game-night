const express = require('express');
const app = express();
const port = 3001;
const _ = require('lodash');

var gameMappings = require("./static/Games.json");
gameMappings = gameMappings.gameList.map(gameInfo => {
  gameInfo['interestedPlayers'] = [];
  return gameInfo;
});

app.get('/games', (req, res) => {
  res.send(gameMappings);
})

app.post('/games', (req, res) => {
  let { mappings } = req;
  gameMappings = mappings;
  res.send("okay");
})

app.listen(port);