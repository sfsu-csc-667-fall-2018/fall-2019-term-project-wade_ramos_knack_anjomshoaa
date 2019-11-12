const pgp = require('pg-promise')();
const connection = pgp(process.env.DATABASE_URL);
const uuidv4 = require('uuid/v4');
const GameState = require("../state.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;
/* 
The following classes are ORM classes. 
These classes represent tables in our database.
They will allow us to retreive, update, delete records.
Additionally, some join sql logic may need to be applied
for some operations such as Authentication using passport
*/

class Users {
    
    static get(uuid) {
        return new Promise((resolve, reject) => {
            connection.one('select * from users where uuid = $1', [uuid])
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

    static create(username, email, password) {
        let uuid = uuidv4();
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
            connection.none('INSERT INTO public.users(id, name, email, password) VALUES($1, $2, $3, $4)', [uuid, username, email, hash])
                .then(() => {
                    // success;
                    resolve(uuid);
                })
                .catch(error => {
                    // error;
                    console.error(error);
                    reject(error);
                });
            });
        });
    } // create() end

    static updateName(uuid, name) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE public.users SET name = $1 WHERE id = $2', [name, uuid])
                .then(() => {
                    // success;
                    resolve(name);
                })
                .catch(error => {
                    // error;
                    console.error(error);
                    reject(error);
                });
        });   
    }

    static updateEmail(uuid, email) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE public.users SET email = $1 WHERE id = $2', [email, uuid])
                .then(() => {
                    // success;
                    resolve(name);
                })
                .catch(error => {
                    // error;
                    console.error(error);
                    reject(error);
                });
        });   
        
    }

    static updatePassword(uuid, password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
            connection.none('UPDATE public.users SET password = $1 WHERE id = $2', [hash, uuid])
                .then(() => {
                    // success;
                    resolve(uuid);
                })
                .catch(error => {
                    // error;
                    console.error(error);
                    reject(error);
                });
            });
        });           
    }

    static updateGameState(uuid, gameStateId) {
        return new Promise((resolve, reject) => {
            connection.none('UPDATE public.users SET gamestate_id = $1 WHERE id = $2', [gameStateId, uuid])
                .then(() => {
                    // success;
                    resolve(gameStateId);
                })
                .catch(error => {
                    // error;
                    console.error(error);
                    reject(error);
                });
        });   
    }

    static updateWinsLoses(uuid, winLoss) {
        if(winLoss == true)
        {
            return new Promise((resolve, reject) => {
                connection.none('UPDATE public.users SET wins = wins + 1 WHERE id = $1', [uuid])
                    .then(() => {
                        // success;
                        resolve(uuid);
                    })
                    .catch(error => {
                        // error;
                        console.error(error);
                        reject(error);
                    });
            });   
        }
        else
        {
            return new Promise((resolve, reject) => {
                connection.none('UPDATE public.users SET loses = loses + 1 WHERE id = $1', [uuid])
                    .then(() => {
                        // success;
                        resolve(uuid);
                    })
                    .catch(error => {
                        // error;
                        console.error(error);
                        reject(error);
                    });
            });   
        }
    }
}


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


module.exports = {GameStates: GameStates, Users: Users};