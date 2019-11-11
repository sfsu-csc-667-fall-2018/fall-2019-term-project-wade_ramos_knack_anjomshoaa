'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
    */
  
  return queryInterface.sequelize.transaction((t) => {
    return Promise.all([
      queryInterface.createTable('users', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        gamestate_id: Sequelize.DataTypes.UUID,
        pass_id: Sequelize.DataTypes.UUID,
        wins: Sequelize.INTEGER,
        loses: Sequelize.INTEGER,
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW')
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW')
        }
    
      }, { transaction: t }),

      queryInterface.createTable('salts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        salt: Sequelize.STRING(1234),
        pass_id: Sequelize.DataTypes.UUID
      }, { transaction: t }),

      queryInterface.createTable('passwords', {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
        },
        password: Sequelize.STRING(1234)
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
