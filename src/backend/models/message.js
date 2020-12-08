'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    static associate(models) {
      Messages.belongsTo(models.Groups, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE'
      });

      Messages.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  Messages.init(
    {
      groupId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      message: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Messages'
    }
  );
  return Messages;
};
