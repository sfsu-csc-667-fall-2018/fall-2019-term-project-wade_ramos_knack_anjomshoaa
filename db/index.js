/* 
The following classes are ORM classes. 
These classes represent tables in our database.
They will allow us to retreive, update, delete records.
Additionally, some join sql logic may need to be applied
for some operations such as Authentication using passport
*/

const GameStates = require('./GameStates');
const Users = require('./Users');

module.exports = {GameStates: GameStates, Users: Users};