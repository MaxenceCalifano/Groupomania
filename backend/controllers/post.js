const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const Post = require("../models/post")
const sql = require("../models/db");


exports.newPost = (req, res) => {
    sql.query(`SELECT * FROM users WHERE uuid = "${req.userId}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }  

        const post = new Post({
            uuid : uuidv4(),
            username : resp[0].username,
            userId : jwt.verify(req.cookies.access_token, "token",).userId,
            title: req.body.title,
            text: req.body.text,
            mediaUrl: req.file.filename,
        })
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

exports.getAllPosts = (req, res) => {
    sql.query("SELECT * FROM posts", (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
         // console.log(resp)
          res.status(200).json({posts:resp})
        });
};

exports.modifyPost = (req, res) => {

    sql.query(`SELECT * FROM posts WHERE uuid = "${req.body.uuid}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
       
          if(req.userId !==resp[0].userId) { //Compare id in the request with id of the post 
            res.status(401).json({
                message: "You're not allowed to modify this post"
            })
        } else {
            const postModifications = {
                uuid: req.body.uuid,
                title: req.body.title,
                text: req.body.text,
                mediaUrl: req.file.filename,
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
    sql.query(`SELECT * FROM posts WHERE uuid = "${req.body.uuid}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log(resp)
          if(req.userId !==resp[0].userId) {
            res.status(401).json({
                message: "You're not allowed to delete this post"
            })
        } else {
            sql.query(`DELETE FROM posts WHERE uuid = "${req.body.uuid}"`, (err) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
                  res.status(200).json({message: "post supprimé"})
                });
        }
    
    });
}