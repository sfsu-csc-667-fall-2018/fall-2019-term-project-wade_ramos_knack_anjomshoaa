const express = require('express');
const router = express.Router();

const db = require("../db/index.js");

/* create a new gamestate object, 
save it into the gamestates table in postgres, 
send the json to the client */
router.get('/newGameState', function(req, res, next) {
    db.GameStates.create()
    .then(gameState => {
        res.status(200).json(gameState.json);
    })
    .catch(error => {
        res.status(500).send('error: could not create game state');
    });
});

// retreive a gamestate with a json object containing uuid:"xxxx-xxx..."
router.get('/getGameState', function(req, res, next) {
    let uuid = req.body.uuid;
    db.GameStates.get(uuid)
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

    db.GameStates.update(gamestate.state[0].uuid, gamestate)
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