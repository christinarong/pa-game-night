const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
const port = 3001;

app.use(bodyParser.json());

global.gameMappings = require("./static/Games.json");
global.gameMappings = global.gameMappings.gameList.map(gameInfo => {
  gameInfo['interestedPlayers'] = [];
  return gameInfo;
});

app.get('/games', (req, res) => {
  res.send(gameMappings);
})

app.post('/games', (req, res) => {
  const { mappings } = req.body
  global.gameMappings = mappings;
  res.send(gameMappings);
})

app.listen(port);