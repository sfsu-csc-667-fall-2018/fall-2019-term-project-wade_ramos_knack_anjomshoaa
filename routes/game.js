const express = require('express');
const router = express.Router();
const GameStates = require("../db/index.js").GameStates;
const checkHands = require("../game/check.js");

const bet = 1;

const io = require('../socket/socketServer');

const updateCurPlayer = (players, current_player) => {

    console.log('updating current player');
    return new Promise((resolve, reject) => {

        console.log('current player: ', current_player)
        if(current_player === 8)  
        {
            current_player = 0;
        }
        else
        {
            current_player += 1;
        }
        console.log('current player: ', current_player)
        while(true)
        {
            if(players[current_player].isInHand === true)
            {
                resolve(current_player);
                break;
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
            
    });

}

const dealCards = (gamestate) => {
    
    return new Promise((resolve, reject) => {
        
        if(gamestate.community_cards.length !== 5)
        {
            for(let i = 0; i < 5; i++)
            {
                gamestate.community_cards.push(gamestate.deck.pop())
            }
        }
    
        gamestate.players.forEach(player => {
            if(player.username !== null && player.isInHand === true)
            {
                if(player.holeCards.length === 0)
                {
                player.holeCards.push(gamestate.deck.pop());
                player.holeCards.push(gamestate.deck.pop());
                }
            }
        })

        gamestate.betting_round = 1;

        resolve(gamestate);
    });
}

const emitUpdatedGameState = (uuid) => {
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
                //console.log(game.players)
                let numPlayers = 0;
                game.players.forEach(player => {
                    if(player.username !== null)
                    {
                        numPlayers++;
                    }
                })
                game.player_count = numPlayers;
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

router.get('/testCheckHands/:id', (req, res, next) => {  
    let uuid = req.params.id;
    GameStates.get(uuid)
        .then((data) => {
            // success;
            
            // update the gamestate 
            
            // let winnerIndex = checkHands.winner(data.community_cards, data.players);
            // let winnerIndex = 'test';
            
            checkHands.winner(data.community_cards, data.players).then(index =>{ 
                let winnerIndex = index;
                data.players[winnerIndex].chipCount += data.pot_amount;

                console.log(winnerIndex)
                console.log('pot: ', data.pot_amount)
                console.log(data.players[winnerIndex].chipCount)
                res.status(200).json(JSON.stringify('The winner index: ' + winnerIndex));
            });

            //res.status(200).json(JSON.stringify('end of testcheck'));
           
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:username/createGame', (req, res, next) => { 
    GameStates.create(req.params.username)
    .then(gamestate => {
        res.status(200).json(gamestate.id);
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

router.post('/:id/:username/check', (req, res, next) => {
// query the db and get the current gamestate
    // update the current player index
    let uuid = req.params.id
        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
            console.log(data.players[data.current_player]) 
    
            // update the gamestate 
            
            updateCurPlayer(data.players,data.current_player).then(async index => {
                data.current_player = index;
                
                if(data.current_player === data.dealer)
                {
                    // the current betting round is over. 
                    // increment betting round.
                    data.betting_round += 1;
                    data.last_raised = -1;
                    if(data.betting_round >= 5)
                    {
                        let winnerIndex = await checkHands.winner(data.community_cards, data.players)
                        data.players[winnerIndex].chipCount += data.pot_amount;
                            console.log('round over \nWinner: ',data.players[winnerIndex]);
                            console.log('Winnings: ', data.players[winnerIndex].chipCount);
                        // checkHands.winner(data.community_cards, data.players).then(index =>{ 
                        //     console.log('round over')
                        //     let winnerIndex = index;
                        //     data.players[winnerIndex].chipCount += data.pot_amount;

                        //     console.log('round over \nWinner: ',data.players[winnerIndex]);
                        //     console.log('Winnings: ', data.players[winnerIndex].chipCount);
                        // });     
                    }
                }

                if(data.current_player === data.last_raised)
                {
                    // the current betting round is over. 
                    // increment betting round.
                    data.betting_round += 1;
                    data.last_raised = -1;
                }


                // update current player in db
                const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player) 
                // update betting round in db
                const updateBettingRound = GameStates.updateBettingRound(uuid,data.betting_round) 
                // update the players array in db
                const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
    
                Promise.all([updateCurrentPlayer, updateBettingRound, updatePlayers]).then(values => { 
                    console.log(values);
                    emitUpdatedGameState(uuid);
                    res.status(200).send(values);
                })
                .catch(errors => {
                    console.log(error)
                });     

                })
                // end update to gamestate
           
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/:username/call', (req, res, next) => {
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

            updateCurPlayer(data.players,data.current_player).then(async index => {
                data.current_player = index;

                if(data.current_player === data.dealer)
                {
                    // the current betting round is over. 
                    // increment betting round.
                    data.betting_round += 1;
                    data.last_raised = -1;

                    if(data.betting_round >= 5)
                    {   
                        let winnerIndex = await checkHands.winner(data.community_cards, data.players)
                        data.players[winnerIndex].chipCount += data.pot_amount;
                            console.log('round over \nWinner: ',data.players[winnerIndex]);
                            console.log('Winnings: ', data.players[winnerIndex].chipCount);
                    }
                }

                // update the players array in db
                const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
                // update current player in db
                const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player)  
                // update pot amount in db
                const updatePotAmount = GameStates.updatePotAmount(uuid,data.pot_amount)
                // update betting round in db
                const updateBettingRound = GameStates.updateBettingRound(uuid,data.betting_round)
                // update last raised in db
                const updateLastRaised = GameStates.updateLastRaised(uuid, data.last_raised); 

                Promise.all([updatePlayers, updateCurrentPlayer, updatePotAmount, updateBettingRound, updateLastRaised]).then(values => { 
                    console.log(values);
                    emitUpdatedGameState(uuid);
                    res.status(200).send(values);
                })
                .catch(errors => {
                    console.log(error)
                });  


            }).catch(err => {
                console.log('error in bet: ', err);
            })
            // end update to gamestate

        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/:username/bet', (req, res, next) => {
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
            data.last_raised = data.current_player;
            updateCurPlayer(data.players,data.current_player).then(index => {
                data.current_player = index;
                // update the players array in db
                const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
                // update last raised in db
                const updateLastRaised = GameStates.updateLastRaised(uuid, data.last_raised);
                // update current player in db
                const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player)  
                // update pot amount in db
                const updatePotAmount = GameStates.updatePotAmount(uuid,data.pot_amount)
    
                Promise.all([updatePlayers, updateCurrentPlayer, updatePotAmount, updateLastRaised]).then(values => { 
                    console.log(values);
                    emitUpdatedGameState(uuid);
                    res.status(200).send(values);
                    
                })
                .catch(errors => {
                    console.log(error)
                });   


            }).catch(err => {
                console.log('error in bet: ', err);
            })
            // end update to gamestate
    
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/:username/raise', (req, res, next) => {
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
            console.log('Current Player: ',data.players[data.current_player].username) 
    
            // update the gamestate
            data.players[data.current_player].currentBet += (bet*2);
            data.players[data.current_player].chipCount -= (bet*2);
            data.pot_amount += (bet*2); 
            data.last_raised = data.current_player;
            updateCurPlayer(data.players,data.current_player).then(index => {
                data.current_player = index;
                // update the players array in db
                const updatePlayers = GameStates.updatePlayers(uuid, data.players); 
                // update last raised in db
                const updateLastRaised = GameStates.updateLastRaised(uuid, data.last_raised);
                // update current player in db
                const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player); 
                // update pot amount in db
                const updatePotAmount = GameStates.updatePotAmount(uuid,data.pot_amount);
    
                Promise.all([updatePlayers, updateCurrentPlayer, updatePotAmount, updateLastRaised]).then(values => { 
                    console.log(values);
                    emitUpdatedGameState(uuid);
                    res.status(200).send(values);
                })
                .catch(errors => {
                    console.log(error)
                });  

                })
                // end update to gamestate
            
        })
        .catch(error => {
            // error;
            console.error(error);
            res.status(500).send('error: could not get game state');
        });
});

router.post('/:id/:username/fold', (req, res, next) => {
    // query the db and get the current gamestate
    // update the players array:
        // update the current players isInHand false
    
    let uuid = req.params.id
        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
             
            let playersInHand = 0;
            let winnerIndex = 0;
            // update the gamestate
            data.players[data.current_player].isInHand = false;
            
            for(let i = 0; i < data.players.length; ++i)
            {
                if(data.players[i].isInHand === true)
                {
                    playersInHand++;
                    winnerIndex = i;
                }
            }

            if(playersInHand === 1)
            {
                // Everyone folded the last player wins: winnerIndex is accurate
                data.betting_round = 5;
                data.players[winnerIndex].chipCount += data.pot_amount;
                data.pot_amount = 0; 
            }
            updateCurPlayer(data.players,data.current_player).then(index => {
                data.current_player = index;
                 // update the players array in db
                const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
                // update current player in db
                const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player) 
                // update betting round in db 
                const updateBettingRound = GameStates.updateBettingRound(uuid,data.betting_round) 
    
                Promise.all([updatePlayers, updateCurrentPlayer, updateBettingRound]).then(values => { 
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

            }).catch(err => {
                console.log(err);
            })
            // end update to gamestate
            
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
            let canJoin = true;
            let player_count = 0
            //check if the username is already in the game
            for(let i = 0; i < data.players.length; ++i)
            {
                if(data.players[i].username === userName)
                {
                    // the player is already in the game
                    canJoin = false;
                }
                else
                {
                    // the player is not in the game. count active players
                    if(data.players[i].username !== null && data.players[i].isInHand === true)
                    { 
                        player_count++;
                    }      
                }
            }
    
            // update the gamestate
            if(canJoin)
            {
                data.players[joinIndex].username = userName;   
                if(data.betting_round === 0)
                {
                    data.players[joinIndex].isInHand = true;
                    if(data.players[joinIndex].holeCards.lenght === 0)
                    {
                        data.players[joinIndex].holeCards.push(data.deck.pop());
                        data.players[joinIndex].holeCards.push(data.deck.pop());
                    }
                }
                else
                {
                    console.log('hand in progress: not cards dealt')
                }
            }
            console.log(player_count)

            if(player_count >= 1)
            {
                // note that dealCards also updated the betting_round
                dealCards(data).then(updatedGameState => {
                    data = updatedGameState
                }).catch(err => {
                    console.log(err)
                })
            }
            // end update to gamestate
            
            // update the players array in db
            const updatePlayers = GameStates.updatePlayers(uuid, data.players)
            // update the deck in db
            const updateDeck = GameStates.updateDeck(uuid, data.deck)
            // update community cards in db
            const updateCommunityCards = GameStates.updateCommunityCards(uuid,data.community_cards)
            // update betting round in db
            const updateBettingRound = GameStates.updateBettingRound(uuid,data.betting_round)
    
            Promise.all([updatePlayers, updateDeck, updateCommunityCards, updateBettingRound]).then(values => { 
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
    let found = false;
    let joinIndex = 0;
    
        // query the db and get the current gamestate
        GameStates.get(uuid)
        .then((data) => {
            // success;
            let player_count = 0;
            //find the users index in players
            for(let i = 0; i < data.players.length; ++i)
            {
                if(data.players[i].username === userName)
                {
                    joinIndex = i;
                    found = true;
                    break;
                }
                else
                {
                    // the player is not in the game. count active players
                    if(data.players[i].username !== null && data.players[i].isInHand === true)
                    { 
                        player_count++;
                    }      
                }
            }

            // update the gamestate
            if(found === true)
            {
            data.players[joinIndex].username = null;
            data.players[joinIndex].isInHand = false;
            data.players[joinIndex].holeCards = [];
            }
            // end update to gamestate
            console.log(player_count);
            if(player_count <= 1)
            {
                data.players.forEach(player => {
                    player.holeCards = [];
                })
                data.betting_round = 0;
            }
            
            // update the players array in db
            const updatePlayers = GameStates.updatePlayers(uuid, data.players) 
             // update betting round in db
             const updateBettingRound = GameStates.updateBettingRound(uuid,data.betting_round)
    
            Promise.all([updatePlayers, updateBettingRound]).then(values => { 
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

router.post('/:id/gameOver', (req, res, next) => {
    // query the db and get the current gamestate
        // update the players array:
            // update the current players current bet
            // update the current players chip count
        // update the current pot amount
        // update the current player index
        // deal new cards
        // make anyone who is not inhand = true
        // let gamestate = req.body;
        let uuid = req.params.id
            // query the db and get the current gamestate
            GameStates.get(uuid)
            .then((data) => {
                // success;
        
                // update the gamestate

                //update the players array
                if(true)
                {
                data.players.forEach(player => {
                    player.currentBet = 0;
                    player.holeCards = [];
                    if(player.username != null)
                    {
                        player.isInHand = true;
                    }
                })
                }
                data.pot_amount = 0; 
                data.last_raised = -1;

                updateCurPlayer(data.players,data.current_player).then(index => {
                    data.current_player = index;
                    data.dealer = index;
                    data.community_cards = [];

                    if(true)
                    {
                        // note that dealCards also updated the betting_round
                        dealCards(data).then(updatedGameState => {
                            data = updatedGameState
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                    
                    // update the players array in db
                    const updatePlayers = GameStates.updatePlayers(uuid, data.players); 
                    // update last raised in db
                    const updateLastRaised = GameStates.updateLastRaised(uuid, data.last_raised);
                    // update current player in db
                    const updateCurrentPlayer = GameStates.updateCurrentPlayer(uuid,data.current_player);  
                    // update pot amount in db
                    const updatePotAmount = GameStates.updatePotAmount(uuid,data.pot_amount);
                    // update deck in db
                    const updateDeck = GameStates.updateDeck(uuid, data.deck);
                    // update community cards in db
                    const updateCommunityCards = GameStates.updateCommunityCards(uuid,data.community_cards);
                    // update betting round in db
                    const updateBettingRound = GameStates.updateBettingRound(uuid,data.betting_round);
                    // update dealer in db
                    const updateDealer = GameStates.updateDealer(uuid, data.dealer);
        
                    Promise.all([updatePlayers, updateCurrentPlayer, updatePotAmount, updateLastRaised, updateDeck, updateCommunityCards, updateBettingRound, updateDealer]).then(values => { 
                        console.log(values);
                        emitUpdatedGameState(uuid);
                        res.status(200).send(values);
                        
                    })
                    .catch(errors => {
                        console.log(error)
                    });   
    
    
                }).catch(err => {
                    console.log('error in bet: ', err);
                })
                // end update to gamestate
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