'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Affiliates", 'rtn', {
      type: Sequelize.STRING(20),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Affiliates", 'rtn');
  }
};
