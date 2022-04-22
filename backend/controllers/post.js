const jwt = require("jsonwebtoken");

const fs = require("fs");
const Post = require("../models/post")
const sql = require("../models/db");


exports.newPost = (req, res) => {
    sql.query(`SELECT * FROM users WHERE id = "${req.userId}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }  
          const post = new Post({
            userId : jwt.verify(req.cookies.access_token, "token",).userId,
            title: req.body.title,
            text: req.body.text,
            caption: req.body.caption,
        })
        //check if post has no media
        if (req.file !== undefined) {
            post.mediaUrl = req.file.filename;
          }
        Post.create(post, (err,data) => {
            if (err) 
              res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
            else res.send(data)
            })
        })
};

exports.getAllPosts = (req,res) => {
    sql.query("SELECT *, p.id AS postID FROM posts p JOIN users ON p.userID = users.id", (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          res.status(200).json({posts:resp})
        });
};

exports.modifyPost = (req, res) => {

    sql.query(`SELECT * FROM posts WHERE id = "${req.body.id}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          
          if(req.userID != resp[0].userId) { //Compare id in the request with id of the post 
            res.status(401).json({
                message: "You're not allowed to modify this post"
            })
        } else {

            const postModifications = {
                id: req.body.id,
                title: req.body.title,
                text: req.body.text,
                caption: req.body.caption,
            }
            //check if post has media or not
            if (req.file !== undefined) {
            fs.unlink(`images/${resp[0].mediaUrl}`, () => console.log("previous image has been delete"))

            postModifications.mediaUrl = req.file.filename;
          }
            Post.modifyPost(postModifications, (err,data) => {
                if (err) 
                  res.status(500).send({
                  message:
                    err.message || "Some error occurred while modifying the post."
                });
                else res.send(data)
            });
        }
        });
};

exports.deletePost = (req, res) => {
    // First check if the request comes from the post owner
    sql.query(`SELECT * FROM posts WHERE id = "${req.body.id}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          if (req.userPrivilege == 1 || req.userId == resp[0].userID) {
            fs.unlink(`images/${resp[0].mediaUrl}`, () => console.log("post image has been delete"))
            //Delete all the comments
            sql.query(`DELETE FROM comments WHERE postId = "${req.body.id}"`, (err) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
            });
            //Delete all the likes
            sql.query(`DELETE FROM likes WHERE postId = "${req.body.id}"`, (err) => {
              if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }
              });

            //then delete the posts
            sql.query(`DELETE FROM posts WHERE id = "${req.body.id}"`, (err) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
                  res.status(200).json({message: "post supprimé"})
                });
          } else {
            res.status(401).json({
                  message: "You're not allowed to delete this post"
              })
          }         
        }
    );
}