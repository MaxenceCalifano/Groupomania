'use strict';
const validate = require("validator");
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
    }

    toJSON() {
      return {...this.get(), id: undefined} //cache l'id de l'utilisateur
    }
  }
  User.init(
    {
    uuid: { //génere un identifiant unique
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {msg:"Veuillez fournir une adresse email valide s'il vous plaît"},
      }
    },
    password : {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User
}