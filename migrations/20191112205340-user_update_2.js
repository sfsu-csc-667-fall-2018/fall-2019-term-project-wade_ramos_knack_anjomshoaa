'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
          queryInterface.addColumn('users', 'password', {
            type: Sequelize.STRING(1234),
          }, { transaction: t }),

          queryInterface.dropTable('passwords',{ transaction: t }),
          queryInterface.dropTable('salts',{ transaction: t }),
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
