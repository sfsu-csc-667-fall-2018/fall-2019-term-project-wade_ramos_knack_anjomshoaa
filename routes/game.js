const express = require('express');
const router = express.Router();
const GameStates = require("../db/index.js").GameStates;

const bet = 1;

const io = require('../socket/socketServer');

const updateCurPlayer = (players, current_player) => {
    if(current_player === 8)  
    {
        current_player = 0;
    }
    else
    {
        current_player += 1;
    }

    while(true)
    {
        if(players[current_player].isInHand === true)
        {
            return current_player
        }
        else
        {
            if(current_player === 8)  
            {
                current_player = 0;
            }
            else
            {
                current_player += 1;
            }
        }
    }
}

const emitUpdatedGameState = (uuid) =>{
    // websocket logic will go here
    // this function will be called after every 
    // endpoint finished updating the db.

        GameStates.get(uuid)
        .then((data) => {
            // success;
            console.log('Emiting updated gamestate') 
            console.log(uuid)
            io.to(uuid).emit('gameState',data)
            /**
             * AMIR: Use socket.io to send the updated gamestate
             * data = gamestate
             * uuid = the room I am sending this to
             */
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
}

router.get('/allGames', (req, res, next) => {  
    GameStates.getActive()
    .then(games => {
        games.forEach(game => {
            // console.log('game id: ', game.id);   
            if(game.players !== null) //players is not null
            {
                game.player_count = game.players.length
            }
            else
            {
                game.player_count = 0
            }
            delete game.players;
            // console.log('player_count: ', game.player_count);
        });
        res.status(200).json(games);
        // returns the game id's and the number of players in the game
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
// query the db and get the current gamestate
    // update the current player index
    let uuid = req.params.id
        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
            console.log(data.players[data.current_player]) 
    
            // update the gamestate 
            data.current_player = updateCurPlayer(data.players,data.current_player)
            // end update to gamestate
            
            // update current player in db
            const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player)  
 
            Promise.all([updateCurrentPlayer]).then(values => { 
                console.log(values);
                emitUpdatedGameState(uuid);
                res.status(200).send(values);
            })
            .catch(errors => {
                console.log(error)
            });     
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/bet', (req, res, next) => {
// query the db and get the current gamestate
    // update the players array:
        // update the current players current bet
        // update the current players chip count
    // update the current pot amount
    // update the current player index
    // let gamestate = req.body;
    let uuid = req.params.id
        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
            console.log(data.players[data.current_player]) 
    
            // update the gamestate
            data.players[data.current_player].currentBet += bet;
            data.players[data.current_player].chipCount -= bet;
            data.pot_amount += bet; 
            data.current_player = updateCurPlayer(data.players,data.current_player)
            // end update to gamestate
            
            // update the players array in db
            const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
            // update current player in db
            const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player)  
            // update pot amount in db
            const updatePotAmount = GameStates.updatePotAmount(uuid,data.pot_amount)
 
            Promise.all([updatePlayers, updateCurrentPlayer, updatePotAmount]).then(values => { 
                console.log(values);
                emitUpdatedGameState(uuid);
                res.status(200).send(values);
                
            })
            .catch(errors => {
                console.log(error)
            });   
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/raise', (req, res, next) => {
    // query the db and get the current gamestate
    // update the players array:
        // update the current players current bet
        // update the current players chip count
    // update the current pot amount
    // update the current player index
    // let gamestate = req.body;
    let uuid = req.params.id
        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
            console.log(data.players[data.current_player]) 
    
            // update the gamestate
            data.players[data.current_player].currentBet += (bet*2);
            data.players[data.current_player].chipCount -= (bet*2);
            data.pot_amount += (bet*2); 
            data.current_player = updateCurPlayer(data.players,data.current_player)
            // end update to gamestate
            
            // update the players array in db
            const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
            // update current player in db
            const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player)  
            // update pot amount in db
            const updatePotAmount = GameStates.updatePotAmount(uuid,data.pot_amount)
 
            Promise.all([updatePlayers, updateCurrentPlayer, updatePotAmount]).then(values => { 
                console.log(values);
                emitUpdatedGameState(uuid);
                res.status(200).send(values);
            })
            .catch(errors => {
                console.log(error)
            });  

            //GameSa request for the updated gamestate and emit
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/call', (req, res, next) => {
    // query the db and get the current gamestate
    // update the players array:
        // update the current players current bet
        // update the current players chip count
    // update the current pot amount
    // update the current player index
    // let gamestate = req.body;
    let uuid = req.params.id
        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
            console.log(data.players[data.current_player]) 
    
            // update the gamestate
            data.players[data.current_player].currentBet += bet;
            data.players[data.current_player].chipCount -= bet;
            data.pot_amount += bet; 
            data.current_player = updateCurPlayer(data.players,data.current_player)
            // end update to gamestate
            
            // update the players array in db
            const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
            // update current player in db
            const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player)  
            // update pot amount in db
            const updatePotAmount = GameStates.updatePotAmount(uuid,data.pot_amount)
 
            Promise.all([updatePlayers, updateCurrentPlayer, updatePotAmount]).then(values => { 
                console.log(values);
                emitUpdatedGameState(uuid);
                res.status(200).send(values);
            })
            .catch(errors => {
                console.log(error)
            });  

            //GameSa request for the updated gamestate and emit
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/fold', (req, res, next) => {
    // query the db and get the current gamestate
    // update the players array:
        // update the current players isInHand false
    
    let uuid = req.params.id
        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
            console.log(data.players[data.current_player]) 
    
            // update the gamestate
            data.players[data.current_player].isInHand = false;
            data.current_player = updateCurPlayer(data.players,data.current_player)
            // end update to gamestate
            
            // update the players array in db
            const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
            // update current player in db
            const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player)  
            
 
            Promise.all([updatePlayers, updateCurrentPlayer]).then(values => { 
                console.log(values);
                emitUpdatedGameState(uuid);
                res.status(200).send(values);
            })
            .catch(errors => {
                console.log(error)
            });  
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/:username/:index/join', (req, res, next) => {
    // query the db and get the current gamestate
    // update the players array:
        // find the first instance of a null username and update that
    
    let uuid = req.params.id;
    let userName = req.params.username;
    let joinIndex = req.params.index;

        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
    
            // update the gamestate
            data.players[joinIndex].username = userName;
            data.players[joinIndex].isInHand = true;
            // end update to gamestate
            
            // update the players array in db
            const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
    
            Promise.all([updatePlayers]).then(values => { 
                console.log(values);
                emitUpdatedGameState(uuid);
                res.status(200).send(values);       
            })
            .catch(errors => {
                console.log(error)
            });  
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/:username/leave', (req, res, next) => {
    // query the db and get the current gamestate
    // update the players array:
        // find the first instance of a null username and update that
    
    let uuid = req.params.id;
    let userName = req.params.username;
    let joinIndex = req.params.index;
    
        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
    
            // update the gamestate
            data.players[joinIndex].username = null;
            data.players[joinIndex].isInHand = false;
            // end update to gamestate
            
            // update the players array in db
            const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
    
            Promise.all([updatePlayers]).then(values => { 
                console.log(values);
                emitUpdatedGameState(uuid);
                res.status(200).send(values);
            })
            .catch(errors => {
                console.log(error)
            });  
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.get('/:id', function(request, response, next) {
    response.status(200).sendFile(__basedir + '/build/index.html');
  });

module.exports = router;