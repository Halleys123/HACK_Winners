'use strict';
const {
  Model
} = require('sequelize');
const bcrypt=require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
    allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false},
    password: {type:DataTypes.STRING,allowNull:false},
    ethAddress: {type:DataTypes.STRING,allowNull:false},
    role: {
      type: DataTypes.ENUM('Admin', 'Contractor', 'Transporter'),
      allowNull: false
    },    
    kycVerified: {type:DataTypes.BOOLEAN,allowNull:false},
    extraDetails: {type:DataTypes.JSON,allowNull: true }

  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(function encrypted(user){
    const response=bcrypt.hashSync(user.password,8);
    user.password=response
  })
  return User;
};