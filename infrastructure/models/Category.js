'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasOne(models.ProductCategory, {
        foreignKey: 'categoryId',
      });

      Category.hasMany(models.SubCategory, {
        foreignKey: 'categoryId',
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );
  return Category;
};
