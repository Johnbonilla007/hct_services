'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuoteDetail extends Model {
    static associate(models) {
      QuoteDetail.belongsTo(models.Quote);
    }
  }
  QuoteDetail.init(
    {
      quoteId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      quality: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      available: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      subTotal: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'QuoteDetail',
    },
  );

  return QuoteDetail;
};
