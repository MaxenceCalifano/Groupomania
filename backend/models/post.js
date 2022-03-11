const sql = require("./db");

//constructeur

const Post = function(post) {
  this.uuid = post.uuid,
  this.userId = post.userId,
  this.title = post.title;
  this.text = post.text;
}

Post.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
}

module.exports =  Post;