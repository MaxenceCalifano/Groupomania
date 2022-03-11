const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");

const { v4: uuidv4 } = require('uuid');
const sql = require("../models/db");


const User = require("../models/user");

exports.signup = (req, res) => {
    //Check request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

      //new user
      bcrypt
        .hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                uuid : uuidv4(),
                username : req.body.username,
                email : req.body.email,
                password : hash,
                avatarUrl : req.body.avatarUrl,
              });
              User.create(user, (err,data) => {
                if (err) 
                  res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the user."
                });
                else res.send(data)
            })
        })
}

 exports.login = (req, res, next) => {
    sql.query(`SELECT * FROM users WHERE email = "${req.body.email}"`, (err, result) => {
     //console.log( result )

        if (err) 
          res.status(500).send({
          message:
            err.message || "Some error occurred while looking for the user."
        });
        else {
            if(result[0] == undefined) {
                return res.status(401).json({error: "utilisateur inconnu"});
            }
            console.log("userIdresult",result)

            bcrypt.compare(req.body.password, result[0].password)
            .then( (comparedPassword) => {
                if(!comparedPassword) {
                    return res.status(401).json({error: "mot de passe erroné"});  
                }
                const token = jwt.sign({userId : result[0].uuid}, "token",
                    { expiresIn: "72h" });
                    res.cookie("access_token", token, {
                        httpOnly: true,
                        secure: true
                    }).json({token}).status(200)
            })
        } 
    })
}

exports.logout = (req, res, next) => {
     res.clearCookie("access_token").status(200).send("L'utilisateur a été déconnécté");
} 