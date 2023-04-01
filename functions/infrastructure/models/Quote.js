'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    static associate(models) {
      Quote.hasMany(models.QuoteDetail, {
        foreignKey: 'quoteId',
        target_key: 'id'
      })

      Quote.belongsTo(models.Affiliate, {
        foreignKey: 'uid'
      });
    }
  }
  Quote.init({
    number_quote: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    available: DataTypes.BOOLEAN,
    email_affiliate: DataTypes.STRING,
    isv: DataTypes.DECIMAL,
    subTotal: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    uid: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Quote',
  });
  return Quote;
};