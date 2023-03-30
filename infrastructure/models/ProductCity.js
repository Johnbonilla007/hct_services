'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCity extends Model {

    static associate(models) {
      ProductCity.belongsTo(models.Product);
      ProductCity.belongsTo(models.City);
    }
  }

  ProductCity.init({
    productId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    quality: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCity',
  });
  return ProductCity;
};