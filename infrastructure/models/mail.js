'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mail.init({
    attempts: DataTypes.INTEGER,
    endTime: DataTypes.DATE,
    error: DataTypes.STRING,
    accepted: DataTypes.STRING,
    messageId: DataTypes.STRING,
    pending: DataTypes.STRING,
    rejected: DataTypes.STRING,
    response: DataTypes.STRING,
    leaseExpireTime: DataTypes.DATE,
    startTime: DataTypes.DATE,
    state: DataTypes.STRING,
    messageHTML: DataTypes.STRING,
    subject: DataTypes.STRING,
    text: DataTypes.STRING,
    to: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mail',
  });
  return Mail;
};