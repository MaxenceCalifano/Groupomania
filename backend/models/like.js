const sql = require("./db");

//constructeur

const Like = function(like) {
  this.userId = like.userId,
  this.postId = like.postId;
}

Like.create = (like, result) => {
    sql.query("INSERT INTO likes SET ?", like, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("like: ", { id: res.insertId, ...like });
      result(null, {
        postId: like.postId
      });
    });
  }

module.exports = Like;