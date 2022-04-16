const Comment = require("../models/comments");
const sql = require("../models/db");

exports.newComment = (req, res) => {
    sql.query(`SELECT * FROM users WHERE id = "${req.userId}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }  
        const comment = new Comment({
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
    //SELECT * FROM comments JOIN users ON comments.userID = users.id WHERE comments.postId = "${req.params.id}"
    sql.query(`SELECT c.id AS commentId, c.userId, c.postId, c.text, users.username, users.avatarUrl 
                FROM comments c JOIN users ON c.userId = users.id WHERE c.postId = "${req.params.id}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          res.status(200).json({comments:resp})
        });
}

exports.modifyComment = (req, res) => {
    sql.query(`SELECT * FROM comments WHERE id = "${req.body.id}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
       
          if(req.userId != resp[0].userId) {
            res.status(401).json({
                message: "You're not allowed to modify this comment"
            })
        } else {
            const commentModifications = {
                id: req.body.id, //Will not be modified, it's used to search the item in DB
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
    sql.query(`SELECT * FROM comments WHERE id = "${req.body.id}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          if (req.userPrivilege == 1 || req.userId == resp[0].userId) {
            sql.query(`DELETE FROM comments WHERE id = "${req.body.id}"`, (err, resp) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
                  res.status(200).json({message: "commentaire supprimé"})
                });
          }
            else {
               res.status(401).json({
                    message: "You're not allowed to delete this post"
                })
            }         
        }
    
    );
}