/**
 * this file will contain the logic for all of the database tables that need to be
 * setup in order for the applicaton to function. 
 */

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const connection = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASS, {
    host:process.env.DB_HOST,
    dialect:process.env.DB_DIALECT
});

// this conn.defintition creates the gamestate table in our instance of postgres
// this table will be used to hold gamestate json data
// this defintion also allows us to store a game state
const States = connection.define('gamestates', {
    uuid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    state: DataTypes.JSON
});

connection.sync({ force:false })
    .then(() => {
        console.log('Database and tables created')
    });

module.exports = States;