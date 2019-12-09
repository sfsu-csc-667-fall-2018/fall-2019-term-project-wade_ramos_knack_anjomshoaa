'use strict';

let players = [
      {
        username: "player1",
        isInHand: true,
        chipCount: 200,
        currentBet:0,
        holeCards: [
          "AC", "AC"
        ]
      },
      {
        username: 'player2',
        isInHand: true,
        chipCount : 200,
        currentBet: 0,
        holeCards: [
          "AC", "AC"
        ]
      },
      {
        username: "player3",
        isInHand: true,
        chipCount: 200,
        currentBet: 0,
        holeCards: [
          "AC", "AC"
        ]
      },
      {
        username: "player4",
        isInHand: true,
        chipCount: 200,
        currentBet: 0,
        holeCards: [
          "AC", "AC"
        ]
      },
      {
        username: "player5",
        isInHand: true,
        chipCount: 200,
        currentBet: 0,
        holeCards: [
          "AC", "AC"
        ]
      },
      {
        username: "player6",
        isInHand: true,
        chipCount: 200,
        currentBet: 0,
        holeCards: [
          "AC", "AC"
        ]
      },
      {
        username: "player7",
        isInHand: true,
        chipCount: 200,
        currentBet: 0,
        holeCards: [
          "AC", "AC"
        ]
      },
      {
        username: "player8",
        isInHand: true,
        chipCount: 200,
        currentBet: 0,
        holeCards: [
          "AC", "AC"
        ]
      },
      {
        username: "player9",
        isInHand: true,
        chipCount: 200,
        currentBet: 0,
        holeCards: [
          "AC", "AC"
        ]
      }
  ]
  
  let communityCards =  [
      "AC", "AC", "AC", "AC", "AC"
    ]
  
  console.log(JSON.stringify(players));
  console.log(JSON.stringify(communityCards));

 const records = [{id: '1c5ac396-78e0-4de8-965a-a5fd111e0f71'
    , created_at: 'NOW()'
    , updated_at: 'NOW()'
    , deck: null
    , pot_amount: 0
    , player_count: 9
    , community_cards: JSON.stringify(communityCards)
    , player_ranking: null
    , is_active: true
    , dealer: 0
    , last_raised: 0
    , current_player: 3
    , players: JSON.stringify(players)
  }]
  

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

  return queryInterface.sequelize.transaction((t) => {
    return Promise.all([
      queryInterface.bulkInsert('gamestates', records, { transaction: t })
    ])
  })
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
