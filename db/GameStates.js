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
            connection.many('select * from gamestates where is_active = true')
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

    static create() {
        console.log('GameStates.js : called to create()');
        let gamestate = new GameState(uuidv4());

        console.log('temp state obj created');
        return new Promise((resolve, reject) => {
            connection.none('INSERT INTO gamestates(id, created_at, updated_at,is_active) VALUES($1, NOW(), NOW(), $2)', [gamestate.uuid, true])
            .then(() => {
                // success;
                console.log('new game state added to db: ', gamestate)
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

    static updatePotAmount(uuid, potAmount) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE gamestates SET pot_amount = $1, updated_at = NOW() WHERE id = $2;', [potAmount, uuid])
            .then(() => {
                // success;
                console.log('updated pot_amount in db');
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