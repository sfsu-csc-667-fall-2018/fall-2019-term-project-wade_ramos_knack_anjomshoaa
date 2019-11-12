'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
    
    */

   return queryInterface.sequelize.transaction((t) => {
    return Promise.all([
      queryInterface.addColumn('gamestates', 'deck', {
        type: Sequelize.DataTypes.JSON,
      }, { transaction: t }),

      queryInterface.addColumn('gamestates', 'pot_amount', {
        type: Sequelize.DOUBLE,
      }, { transaction: t }),

      queryInterface.addColumn('gamestates', 'player_count', {
        type: Sequelize.INTEGER,
      }, { transaction: t }),

      queryInterface.addColumn('gamestates', 'current_player', {
        type: Sequelize.DataTypes.UUID,
      }, { transaction: t }),

      queryInterface.addColumn('gamestates', 'community_cards', {
        type: Sequelize.DataTypes.JSON,
      }, { transaction: t }),

      queryInterface.addColumn('gamestates', 'player_ranking', {
        type: Sequelize.DataTypes.JSON,
      }, { transaction: t }),

      queryInterface.removeColumn('gamestates', 'state', { transaction: t }),

      queryInterface.renameColumn('gamestates', 'uuid', 'id', { transaction: t })
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
