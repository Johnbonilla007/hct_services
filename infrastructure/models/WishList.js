'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      WishList.belongsTo(models.Affiliate, {
        foreignKey: 'userId',
      });

      WishList.belongsTo(models.Product);
    }
  }
  WishList.init({
    userId: DataTypes.UUID,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WishList',
  });

  return WishList;
};