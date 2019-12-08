const pgp = require('pg-promise')();
const conn = pgp(process.env.DATABASE_URL);
const uuid = require('uuid/v4');
const state = require("../game/state.js");
console.log('database initialized')

// manual database insertions

// let players = [
//     {
//       username: "player1",
//       isInHand: true,
//       chipCount: 200,
//       currentBet:0,
//       holeCards: [
//         "AC", "AC"
//       ]
//     },
//     {
//       username: 'shit',
//       isInHand: true,
//       chipCount : 200,
//       currentBet: 0,
//       holeCards: [
//         "AC", "AC"
//       ]
//     },
//     {
//       username: "player3",
//       isInHand: true,
//       chipCount: 200,
//       currentBet: 0,
//       holeCards: [
//         "AC", "AC"
//       ]
//     },
//     {
//       username: "player4",
//       isInHand: true,
//       chipCount: 200,
//       currentBet: 0,
//       holeCards: [
//         "AC", "AC"
//       ]
//     },
//     {
//       username: "player5",
//       isInHand: true,
//       chipCount: 200,
//       currentBet: 0,
//       holeCards: [
//         "AC", "AC"
//       ]
//     },
//     {
//       username: "player6",
//       isInHand: true,
//       chipCount: 200,
//       currentBet: 0,
//       holeCards: [
//         "AC", "AC"
//       ]
//     },
//     {
//       username: "player7",
//       isInHand: true,
//       chipCount: 200,
//       currentBet: 0,
//       holeCards: [
//         "AC", "AC"
//       ]
//     },
//     {
//       username: "shire",
//       isInHand: true,
//       chipCount: 200,
//       currentBet: 0,
//       holeCards: [
//         "AC", "AC"
//       ]
//     },
//     {
//       username: "player9",
//       isInHand: true,
//       chipCount: 200,
//       currentBet: 0,
//       holeCards: [
//         "AC", "AC"
//       ]
//     }
// ]

// let communityCards =  [
//     "AC", "AC", "AC", "AC", "AC"
//   ]

// console.log(JSON.stringify(players));
// console.log(JSON.stringify(communityCards));

// conn.none('UPDATE gamestates SET players = $1, updated_at = NOW() WHERE id = $2;', [JSON.stringify(players), '0eaa9033-a987-4c08-9c68-b3a14951b269'])
// .then(() => {
//     // success;
//     console.log('updated game state in db');
// //    resolve('updated game state in db');
// })
// .catch(error => {
//     // error;
//     console.error(error);
//     // reject(error)
// });

// conn.none('UPDATE gamestates SET community_cards = $1, updated_at = NOW() WHERE id = $2;', [JSON.stringify(communityCards), '0eaa9033-a987-4c08-9c68-b3a14951b269'])
// .then(() => {
//     // success;
//     console.log('updated game state in db');
// //    resolve('updated game state in db');
// })
// .catch(error => {
//     // error;
//     console.error(error);
//     // reject(error)
// });

module.exports = {connection:conn, uuidv4:uuid, GameState:state};