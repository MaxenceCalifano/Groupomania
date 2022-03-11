/* 'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    uuid: { //génere un identifiant unique
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.STRING, // Identifiant du créateur du post
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
}; */