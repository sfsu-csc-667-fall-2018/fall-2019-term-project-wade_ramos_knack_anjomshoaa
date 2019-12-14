const db = require('./postgres.js');
const connection = db.connection;
const uuidv4 = db.uuidv4;
const GameState = require('../game/state.js');

class GameStates {

    static get(uuid) {  
        return new Promise((resolve, reject) => {
            connection.one('select * from gamestates where id = $1', [uuid])
            .then((data) => {
                // success;
                //console.log(data)
                resolve(data);
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }

    static getActive() {  
        return new Promise((resolve, reject) => {
            connection.many('select id, players from gamestates where is_active = true')
            .then((data) => {
                // success;
                // console.log(data)
                resolve(data);
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }

/** 
    id: _id
    , created_at: 'NOW()'
    , updated_at: 'NOW()'
    , deck: _deck
    , pot_amount: 0
    , player_count: 1
    , community_cards: JSON.stringify(communityCards)
    , player_ranking: null
    , is_active: true
    , dealer: 0
    , last_raised: 0
    , current_player: 3
    , players: JSON.stringify(players) 
*/

    static create(username) {
        // console.log('GameStates.js : called to create()');
        let gamestate = new GameState(uuidv4(), username);
        // console.log(gamestate)

        let query = `INSERT INTO gamestates(
            id, 
            created_at, 
            updated_at,
            deck,
            pot_amount,
            player_count,
            community_cards,
            player_ranking,
            is_active,
            dealer,
            last_raised,
            current_player,
            players,
            betting_round
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;

        return new Promise((resolve, reject) => {
            connection.none(query, [gamestate.id, 
                                    gamestate.created_at, 
                                    gamestate.updated_at, 
                                    JSON.stringify(gamestate.deck),
                                    gamestate.pot_amount,
                                    gamestate.player_count,
                                    JSON.stringify(gamestate.community_cards),
                                    gamestate.player_ranking,
                                    gamestate.is_active,
                                    gamestate.dealer,
                                    gamestate.last_raised,
                                    gamestate.current_player,
                                    JSON.stringify(gamestate.players),
                                    gamestate.betting_round])
            .then(() => {
                // success;
                console.log('new game state added to db');
                resolve(gamestate);
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }

    static update(uuid, gamestate) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE gamestates SET state = $1, updated_at = NOW() WHERE id = $2;', [gamestate, uuid])
            .then(() => {
                // success;
                // console.log('updated game state in db');
               resolve();
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }

    static updateCurrentPlayer(uuid, currPLayer) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE gamestates SET current_player = $1, updated_at = NOW() WHERE id = $2;', [currPLayer, uuid])
            .then(() => {
                // success;
                // console.log('updated current_player in db');
               resolve('updated updated current_player in db');
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }

    static updatePlayers(uuid, players) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE gamestates SET players = $1, updated_at = NOW() WHERE id = $2;', [JSON.stringify(players), uuid])
            .then(() => {
                // success;
                // console.log('updated players in db');
               resolve('updated players in db');
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }

    static updateDeck(uuid, deck) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE gamestates SET deck = $1, updated_at = NOW() WHERE id = $2;', [JSON.stringify(deck), uuid])
            .then(() => {
                // success;
                // console.log('updated players in db');
               resolve('updated deck in db');
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }

    static updateBettingRound(uuid, round) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE gamestates SET betting_round = $1, updated_at = NOW() WHERE id = $2;', [round, uuid])
            .then(() => {
                // success;
                // console.log('updated players in db');
               resolve('updated betting_round in db');
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }

    static updateCommunityCards(uuid, communityCards) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE gamestates SET community_cards = $1, updated_at = NOW() WHERE id = $2;', [JSON.stringify(communityCards), uuid])
            .then(() => {
                // success;
                // console.log('updated players in db');
               resolve('updated community_cards in db');
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }

    static updatePotAmount(uuid, potAmount) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE gamestates SET pot_amount = $1, updated_at = NOW() WHERE id = $2;', [potAmount, uuid])
            .then(() => {
                // success;
                //console.log('updated pot_amount in db');
               resolve('updated pot_amount in db');
            })
            .catch(error => {
                // error;
                console.error(error);
                reject(error)
            });
        });
    }
}

module.exports = GameStates;