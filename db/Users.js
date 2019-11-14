const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('./postgres');
const connection = db.connection;
const uuidv4 = db.uuidv4;

class Users {
    
    static getUserByID(uuid) {
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

    static getUserByName(username) {
        return new Promise((resolve, reject) => {
            connection.one('select * from users where name = $1', [username])
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
        
        console.log('The create function is called');
        
        let uuid = uuidv4();

        console.log('right after uuidv4 call');

        return new Promise((resolve, reject) => {

            console.log('the promise is created');

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

module.exports = Users;