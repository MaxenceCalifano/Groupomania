const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const Post = require("../models/post")
const sql = require("../models/db");

exports.newPost = (req, res, next) => {

    const post = new Post({
        uuid : uuidv4(),
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

};

exports.getAllPosts = (req, res, next) => {
    sql.query("SELECT * FROM posts", (err, resp) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          res.status(200).json({posts:resp})
        });
};
/*
exports.deletePost = (req, res, next) => {
    Post.destroy({
        where: { uuid: req.body.uuid}
    })
    .then( () => res.status(200).send("post supprimé"))
    .catch( (err => console.log(err)))
};
//----------------------------------
exports.getAllPosts = (req, res, next) => {
    Post.findAll()
    .then( (posts) => res.status(200).json({posts}))
    .catch(err => console.error(err));
};

// Fonctionnalité sur les posts des autres ou le sien
exports.likeUnlike = (req, res, next) => {

};

exports.comment = (req, res, next) => {

};
//----------------------------------- */