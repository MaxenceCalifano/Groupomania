const db = require("../models");
const Post = db.Post;
const jwt =  require("jsonwebtoken");


// Concerne le propriétaire du post
exports.newPost = (req, res, next) => {
    //console.log(jwt.verify(req.cookies.access_token, "token"))
    const userUUID = jwt.verify(req.cookies.access_token, "token");
    Post.create({
         userId : userUUID.userId,
        // récuperer l'id de l'utilisateur
        title: req.body.title,
        text: req.body.text
    })
    .then( () => res.status(201).json("post créé"))
    .catch(err => console.error(err));
};

exports.modifyPost = (req, res, next) => {
    Post.update( 
        {title: req.body.title,
        text: req.body.text},
        {
        where: { uuid: req.body.uuid},  
    })
    .then( () => res.status(200).send("post modifié"))
    .catch( (err => console.log(err)))
};

/*await User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
}); */

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
//-----------------------------------