"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      // Users.ageを追加
      queryInterface.addColumn("Users", "token", {
        type: Sequelize.STRING(255),
        after: "password", // nameの後ろに追加(MySQLのみ)
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Users", "token")]);
  },
};
