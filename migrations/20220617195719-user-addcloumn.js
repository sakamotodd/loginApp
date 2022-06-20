"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      // Users.addressを追加
      queryInterface.addColumn("Users", "password", {
        allowNull: false,
        type: Sequelize.STRING(255),
        after: "email", // emailの後ろに追加(MySQLのみ)
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Users", "password")]);
  },
};
