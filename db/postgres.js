const pgp = require('pg-promise')();
const conn = pgp(process.env.DATABASE_URL);
const uuid = require('uuid/v4');
const state = require("../game/state.js");
module.exports = {connection:conn, uuidv4:uuid, GameState:state};