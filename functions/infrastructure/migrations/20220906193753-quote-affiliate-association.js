'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Quotes', {
      fields: ['uid'],
      type: 'foreign key',
      name: 'quote_affiliate_association',
      references: {
        table: 'Affiliates',
        field: 'uid'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Quotes', {
      fields: ['uid'],
      type: 'foreign key',
      name: 'quote_affiliate_association',
      references: {
        table: 'Affiliates',
        field: 'uid'
      }
    })
  }
};
