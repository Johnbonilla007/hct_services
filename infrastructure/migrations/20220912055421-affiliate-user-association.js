'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Affiliates', {
      fields: ['uid'],
      type: 'foreign key',
      name: 'affiliate_user_association',
      references: {
        table: 'Users',
        field: 'uid'
      },
      onDelete: 'no action',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Affiliates', {
      fields: ['uid'],
      type: 'foreign key',
      name: 'affiliate_user_association',
      references: {
        table: 'Users',
        field: 'uid'
      },
      onDelete: 'no action',
      onUpdate: 'CASCADE',
    });
  }
};
