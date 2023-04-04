'use strict';
const { Model } = require('sequelize');
var base64 = require('uuid-base64');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ProductCategory, {
        foreignKey: 'productId',
      });

      Product.hasMany(models.ProductCity, {
        foreignKey: 'productId',
      });

      Product.hasMany(models.Rating, {
        foreignKey: 'id_product',
      });

      Product.hasOne(models.WishList, {
        foreignKey: 'productId',
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      brand: DataTypes.STRING,
      condition: DataTypes.STRING,
      description: DataTypes.STRING,
      features: DataTypes.STRING,
      image: DataTypes.STRING,
      manufacturer_number: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      quantity_available: DataTypes.INTEGER,
      rating: DataTypes.DECIMAL,
      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      manufacturerNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );

  Product.beforeCreate(product => (product.uid = base64.encode(product.uid)));

  return Product;
};
