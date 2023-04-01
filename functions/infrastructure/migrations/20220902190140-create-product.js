'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      available: {
        type: Sequelize.BOOLEAN
      },
      brand: {
        type: Sequelize.STRING
      },
      condition: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      features: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      manufacturer_number: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      quantity_available: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      uid: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};