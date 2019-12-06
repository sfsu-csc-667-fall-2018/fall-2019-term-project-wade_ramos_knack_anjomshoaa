'use strict';

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
      queryInterface.addColumn('gamestates', 'dealer', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }, { transaction: t }),
     
      queryInterface.addColumn('gamestates', 'last_raised', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }, { transaction: t }),

      queryInterface.removeColumn('gamestates', 'current_player', { transaction: t }),

      queryInterface.addColumn('gamestates', 'current_player', {
        type: Sequelize.INTEGER,
        defaultValue: 3
      }, { transaction: t })
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
