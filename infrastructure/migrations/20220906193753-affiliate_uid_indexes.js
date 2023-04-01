'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Affiliates', {
      fields: ['uid'],
      type: 'UNIQUE',
      name: 'affiliate_uid_indexes',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Affiliates', {
      fields: ['uid'],
      type: 'UNIQUE',
      name: 'affiliate_uid_indexes',
    })
  }
};
