const sql = require("../models/db");


const Like = require("../models/like");


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
    })
}

exports.getAllLikes = (req, res) => {
    console.log(req.params)
    sql.query(`SELECT * FROM likes WHERE postId = "${req.params.postId}"`, (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
         // console.log(resp)
          res.status(200).json({numberOfLikes : resp.length})
        });
}