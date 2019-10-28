'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   return queryInterface.createTable('gamestates', {
    uuid: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true
    },
    state: Sequelize.DataTypes.JSON,
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
    }

  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('gamestates');
  }
};
