const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
const fs = require("fs");
const db = require("../models/");
const User = db.User;

exports.signup = (req, res) => {
    //console.log(req)
    bcrypt
        .hash(req.body.password, 10)
        .then( (hash) => {
            const newUser =  User.create({
                username : req.body.username,
                email:req.body.email,
                password:hash,
                //avatarUrl: req.file.filename
            })
                .then( () => res.json("utilisateur créé"))
                .catch(err =>  res.json(err.errors[0].message));
        })  
}

exports.login = (req, res, next) => {

    User.findOne({ where: {email: req.body.email}})
    .then(user => {
        if(user == null) {
            //console.log("user est NULL")
           return res.status(401).json({error: "utilisateur inconnu"});
        }

        bcrypt.compare(req.body.password, user.password)
        .then(result => {
            if(!result) {
                return res.status(401).json({error: "mot de passe erroné"});  
            }
            res.status(200).json({
                token: jwt.sign( {userId : user.uuid}, 
                                 "token",
                                 { expiresIn: "72h", }) 
                // récupere la valeur uuid dans la table 
                //et l'assign à userId, elle est encodé avec la clé
            })
          }
        )
    })
    //.then (() => res.json("test"))
}