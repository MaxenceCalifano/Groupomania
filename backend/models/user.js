const sql = require("./db");

//constructeur

const User = function(user) {
  this.uuid = user.uuid,
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.avatarUrl = user.avatarUrl;
}

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
}

User.findOne = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = "${email}"`, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if(res.length){
       console.log(res);
       return res.password
       
    }
  })
}
module.exports =  User;
/* 'use strict';
const validate = require("validator");
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    *
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    
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
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    },
    avatarUrl : {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User
} */