const sql = require("./db");

//constructeur

const Post = function(post) {
  this.username = post.username,
  this.uuid = post.uuid,
  this.userId = post.userId,
  this.title = post.title;
  this.text = post.text;
  this.mediaUrl = post.mediaUrl;
}

Post.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created post: ", { id: res.insertId, ...newPost });
    result(null, {
      username: newPost.username,
      uuid: newPost.uuid,
      title: newPost.title,
      text: newPost.text
    });
  });
}

Post.modifyPost = (postModifications, result) => {
  sql.query(`UPDATE posts SET ? WHERE uuid = "${postModifications.uuid}"`, 
    postModifications, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, {...postModifications})
    })
}

module.exports =  Post;
