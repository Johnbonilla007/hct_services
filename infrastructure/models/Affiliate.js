'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Affiliate extends Model {
    static associate(models) {
      Affiliate.hasMany(models.Quote, {
        foreignKey: 'uid',
      });

      Affiliate.belongsTo(models.User, {
        foreignKey: 'uid'
      });

      Affiliate.hasMany(models.WishList, {
        foreignKey: 'userId',
        sourceKey: 'uid'
      });
    }
  }
  Affiliate.init({
    number_affiliate: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    identification_card: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    uid: DataTypes.UUID,
    company: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Affiliate',
  });

  return Affiliate;
};