'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.Groups, {
        through: 'GroupUsers',
        foreignKey: 'userId',
        timestamps: false
      });

      Users.hasMany(models.Messages, {
        foreignKey: 'userId'
      });
    }
  }
  Users.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Users'
    }
  );
  return Users;
};
