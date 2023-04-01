'use strict';
const { Model } = require('sequelize');
const { generateId } = require('../../commons/utilities');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Affiliate, {
        foreignKey: 'uid'
      });
    }
  }

  User.init({
    uid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    allowMigrate: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {

    user.uid = generateId();
    return user;
  });

  return User;
};