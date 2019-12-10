/* 
The following classes are ORM classes. 
These classes represent tables in our database.
They will allow us to create, retreive, update, delete records.
*/

const GameStates = require('./GameStates');
const Users = require('./Users');

module.exports = {GameStates: GameStates, Users: Users};