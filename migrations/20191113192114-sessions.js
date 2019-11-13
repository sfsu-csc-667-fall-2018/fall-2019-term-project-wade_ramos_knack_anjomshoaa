'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable('session', {
          sid: {
              type: Sequelize.STRING(1234),
              primaryKey: true,
              allowNull: false
          },
          sess: {
            type: Sequelize.DataTypes.JSON,
            allowNull: false
          },
          expire: {
            type: Sequelize.DATE(6),
            allowNull: false
          }
      
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
