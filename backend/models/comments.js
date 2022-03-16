
const sql = require("./db");

const Comment = function(comment) {
  this.uuid = comment.uuid,
  this.userId = comment.userId,
  this.text = comment.text;
  this.postId = comment.postId;
}

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
}

module.exports = Comment;