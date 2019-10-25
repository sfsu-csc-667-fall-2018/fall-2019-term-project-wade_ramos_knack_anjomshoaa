const express = require('express');
const router = express.Router();

const db = require("../postgres.js");

const GameState = require("../state.js");
const uuidv4 = require('uuid/v4');

/* create a new gamestate object, 
save it into the gamestates table in postgres, 
send the json to the client */
router.get('/newGameState', function(req, res, next) {
    let state = new GameState(uuidv4());

    db.none('INSERT INTO public.gamestates(uuid, state, created_at, updated_at) VALUES($1, $2, NOW(), NOW())', [state.uuid, state.json])
    .then(() => {
        // success;
        console.log('new game state added to db')
        res.status(200).json(state.json);
    })
    .catch(error => {
        // error;
        console.error(error);
        res.status(500).send('error: could not create game state');
    });
});

// retreive a gamestate with a json object containing uuid:"xxxx-xxx..."
router.get('/getGameState', function(req, res, next) {
    let uuid = req.body.uuid;
    
    db.one('select * from gamestates where uuid = $1', [uuid])
    .then((data) => {
        // success;
        //console.log(data)
        res.status(200).send(data);
    })
    .catch(error => {
        // error;
        console.error(error);
        res.status(500).send('error: could not get game state');
    });
});

//the body of the request should be a json gamestate object
router.post('/updateGameState', function(req, res, next) {
    let gamestate = req.body;

    db.none('UPDATE gamestates SET state = $1, updated_at = NOW() WHERE uuid = $2;', [gamestate, gamestate.state[0].uuid])
    .then(() => {
        // success;
        console.log('updated game state in db');
        res.status(200).send('OK');
    })
    .catch(error => {
        // error;
        console.error(error);
        res.status(500).send('error: could not update game state');
    });
});

module.exports = router;