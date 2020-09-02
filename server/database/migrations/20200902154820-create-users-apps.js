'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_apps', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'users', key: 'id' },
      },
      app_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'apps', key: 'id' },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_apps');
  },
};
