const express = require('express');
const router = express.Router();

const GameStates = require("../db/index.js").GameStates;

/* create a new gamestate object, 
save it into the gamestates table in postgres, 
send the json to the client */

router.get('/:id', function(request, response, next) {
    response.status(200).sendFile(__basedir + '/build/index.html');
  });

router.get('/allGames', (req, res, next) => {
    GameStates.getActive()
    .then(games => {
        res.status(200).json(games);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

router.get('/createGame', (req, res, next) => {
    GameStates.create()
    .then(gameState => {
        res.status(200).json(gameState.json);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

// retreive a gamestate with a json object containing uuid:"xxxx-xxx..."
// router.get('/getGameState', (req, res, next) => {
//     let uuid = req.body.uuid;
//     db.GameStates.get(uuid)
//     .then((data) => {
//         // success;
//         //console.log(data)
//         res.status(200).send(data);
//     })
//     .catch(error => {
//         // error;
//         console.error(error);
//         res.status(500).send('error: could not get game state');
//     });
    
// });

//the body of the request should be a json gamestate object
// router.post('/updateGameState', (req, res, next) => {
//     let gamestate = req.body;

//     db.GameStates.update(gamestate.state[0].uuid, gamestate)
//     .then(() => {
//         // success;
//         console.log('updated game state in db');
//         res.status(200).send('OK');
//     })
//     .catch(error => {
//         // error;
//         console.error(error);
//         res.status(500).send('error: could not update game state');
//     });
// });


//this endpoint gets the specified gamestates id
router.get('/:id/getGame', (req, res, next) => {
    let id = req.params.id;
    console.log('/:id/getGame is ', id)
    GameStates.get(id)
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

router.post('/:id/check', (req, res, next) => {

    let uuid = req.params.id;
    GameStates.get(uuid)
    .then((data) => {
        // success;
        console.log(data)

        GameStates.updateCurrentPlayer(uuid,data.current_player + 1)
        .then((msg) => {
            res.status(200).send(msg);
        })
        .catch(error => {
            console.log(error)
        });        
        
        // grab the update the 
    })
    .catch(error => {
        // error;
        console.error(error);
        res.status(500).send('error: could not get game state');
    });

    //  let uuid = req.params.id;
    // GameStates.get(uuid)
    // db.GameStates.update(gamestate.state[0].uuid, gamestate)
    // .then(() => {
    //     // success;
    //     console.log('updated game state in db');
    //     res.status(200).send('OK');
    // })
    // .catch(error => {
    //     // error;
    //     console.error(error);
    //     res.status(500).send('error: could not update game state');
    // });
});

router.post('/:id/bet', (req, res, next) => {
    // query the db and get the current gamestate
    // update the players array:
        // update the current players current bet
        // update the current players chip count
    // update the current pot amount
    // update the current player index
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

router.post('/:id/raise', (req, res, next) => {
    // query the db and get the current gamestate
    // update the players array:
        // update the current players current bet
        // update the current players chip count
    // update the current pot amount
    // update the current player index
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

router.post('/:id/call', (req, res, next) => {
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

router.post('/:id/fold', (req, res, next) => {
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