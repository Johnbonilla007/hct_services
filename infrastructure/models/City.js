'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.hasOne(models.ProductCity, {
        foreignKey: 'cityId'
      })
    }
  }
  City.init({
    acronym: DataTypes.STRING,
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};