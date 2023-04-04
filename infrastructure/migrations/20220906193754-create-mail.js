'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attempts: {
        type: Sequelize.INTEGER,
      },
      endTime: {
        type: Sequelize.DATE,
      },
      error: {
        type: Sequelize.STRING,
      },
      accepted: {
        type: Sequelize.STRING,
      },
      messageId: {
        type: Sequelize.STRING,
      },
      pending: {
        type: Sequelize.STRING,
      },
      rejected: {
        type: Sequelize.STRING,
      },
      response: {
        type: Sequelize.STRING,
      },
      leaseExpireTime: {
        type: Sequelize.DATE,
      },
      startTime: {
        type: Sequelize.DATE,
      },
      state: {
        type: Sequelize.STRING,
      },
      messageHTML: {
        type: Sequelize.STRING,
      },
      subject: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mails');
  },
};
