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
        console.log(req.userId);
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