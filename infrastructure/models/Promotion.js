'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    static associate(models) {
      // define association here
    }
  }
  Promotion.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    img: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Promotion',
  });

  return Promotion;
};