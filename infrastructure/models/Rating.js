'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.Product);
    }
  }
  Rating.init({
    id_product: DataTypes.UUID,
    uid: DataTypes.UUID,
    email: DataTypes.STRING,
    vote: DataTypes.DECIMAL,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};