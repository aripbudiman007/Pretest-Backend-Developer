'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Question, {foreignKey: "user_id"})
      this.hasMany(models.Answer, {foreignKey: "user_id"})
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate:(user) => {
        let hash = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))

        user.password = hash
      }
    }
  });
  return User;
};