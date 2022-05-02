const req = require("express/lib/request");
const sql = require("./db");

//constructeur

const User = function(user) {
  //this.uuid = user.uuid,
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
  sql.query(`SELECT * FROM users WHERE email = ?`, email, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if(res.length){
       return res.password
       
    }
  })
}

User.modifyUser = (userModifications, result) => {
  sql.query(`UPDATE users SET ? WHERE id = "${userModifications.id}"`, 
  userModifications, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, {...userModifications})
  })
}
module.exports =  User;
