'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupUsers extends Model {
    static associate(models) {
      GroupUsers.belongsTo(models.Users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      GroupUsers.belongsTo(models.Groups, {
        foreignKey: 'groupId',
        onDelete: 'CASCADE'
      });
    }
  }
  GroupUsers.init(
    {
      userId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'GroupUsers',
      timestamps: false
    }
  );
  return GroupUsers;
};
