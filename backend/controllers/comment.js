const Comment = require("../models/comments");
const { v4: uuidv4 } = require('uuid');
const sql = require("../models/db");

exports.newComment = (req, res) => {
    sql.query(`SELECT * FROM users WHERE uuid = "${req.userId}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }  
        const comment = new Comment({
            uuid: uuidv4(),
            username : resp[0].username,
            userId : req.userId,//jwt.verify(req.cookies.access_token, "token",).userId,
            text: req.body.text,
            postId : req.body.postId
        })

        Comment.create( comment, (err,data) => {
            if (err) 
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the comment."
            });
            else res.send(data)
        })
        }
)}

exports.getAllPostComments = (req, res) => {
    
    sql.query(`SELECT * FROM comments WHERE postid="${req.params.id}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          res.status(200).json({comments:resp})
        });
}

exports.modifyComment = (req, res) => {
    console.log("modify comm")
    sql.query(`SELECT * FROM comments WHERE uuid = "${req.body.uuid}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
       
          if(req.userId !==resp[0].userId) {
            res.status(401).json({
                message: "You're not allowed to modify this comment"
            })
        } else {
            const commentModifications = {
                uuid: req.body.uuid, //Will not be modified, it's used to search the item in DB
                text: req.body.text
            }
            Comment.modifyComment(commentModifications, (err,data) => {
                if (err) 
                  res.status(500).send({
                  message:
                    err.message || "Some error occurred while modifying the comment."
                });
                else res.send(data)
            });
        }
        });
};

exports.deleteComment = (req, res) => {
    sql.query(`SELECT * FROM comments WHERE uuid = "${req.body.uuid}"`, (err, resp) => {
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
            sql.query(`DELETE FROM comments WHERE uuid = "${req.body.uuid}"`, (err, resp) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
                  res.status(200).json({message: "commentaire supprimé"})
                });
        }
    
    });
}