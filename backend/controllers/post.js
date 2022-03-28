const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const Post = require("../models/post")
const sql = require("../models/db");
const Like = require("../models/like");


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
            text: req.body.text
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
       
          if(req.userId !==resp[0].userId) {
            res.status(401).json({
                message: "You're not allowed to modify this post"
            })
        } else {
            const postModifications = {
                uuid: req.body.uuid,
                title: req.body.title,
                text: req.body.text
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

exports.likeUnlike = (req, res) => {

    // SELECT * FROM comments WHERE username = 'maxence'AND postID = '58f5fde0-c65a-4e20-96d0-8538e6ba53fb';
    sql.query(`SELECT * FROM likes WHERE postId="${req.body.postId}" AND userID = "${req.userId}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          console.log("resp: ", resp);

          if(resp.length == 0) {
            const like = new Like({
                userId : req.userId,
                postId : req.body.postId,
            })
            Like.create(like, (err,data) => {
                if (err) 
                  res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the user."
                });
                else res.json({data})
                })
          }
          else {
            sql.query(`DELETE FROM likes WHERE postId="${req.body.postId}" AND userID = "${req.userId}"`, (err, resp) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
                  res.status(200).json({message: "like supprimé"})
                });
          }
          
        /*
          Vérifier si le post a deja un "like" de l'utilisateur
                Si oui :
                   unliker
                Si non : 
                    Enregistrer la valeur du like dans la bdd
        }  */
    })
}