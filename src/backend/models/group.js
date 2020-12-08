'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    static associate(models) {
      Groups.hasMany(models.Messages, {
        foreignKey: 'groupId'
      });

      Groups.belongsToMany(models.Users, {
        through: 'GroupUsers',
        foreignKey: 'groupId',
        timestamps: false
      });
    }
  }
  Groups.init(
    {
      groupName: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Groups'
    }
  );
  return Groups;
};
