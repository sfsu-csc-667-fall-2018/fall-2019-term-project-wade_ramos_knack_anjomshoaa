var express = require('express');
var router = express.Router();

const GameState = require("../state.js");
const uuidv4 = require('uuid/v4');

/* create a new gamestate object, 
save it into the gamestates table in postgres, 
send the json to the client */
router.get('/newGameState', function(req, res, next) {
    let state = new GameState(uuidv4());
    res.json(state.json);
});

router.get('/updateGameState', function(req, res, next) {
    let state = new GameState(uuidv4());
    res.json(state.json);
});

module.exports = router;