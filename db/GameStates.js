const db = require('./postgres');
const connection = db.connection;
const uuidv4 = db.uuidv4;
const GameState = db.GameState;

class GameStates {

    static get(uuid) {  
        return new Promise((resolve, reject) => {
            connection.one('select * from gamestates where uuid = $1', [uuid])
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
        let state = new GameState(uuidv4());
        return new Promise((resolve, reject) => {
            connection.none('INSERT INTO public.gamestates(uuid, state, created_at, updated_at) VALUES($1, $2, NOW(), NOW())', [state.uuid, state.json])
            .then(() => {
                // success;
                console.log('new game state added to db: ', state)
                resolve(state);
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
            connection.none('UPDATE gamestates SET state = $1, updated_at = NOW() WHERE uuid = $2;', [gamestate, uuid])
            .then(() => {
                // success;
                console.log('updated game state in db');
               resolve();
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