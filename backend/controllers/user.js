const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");

const { v4: uuidv4 } = require('uuid');
const sql = require("../models/db");


const User = require("../models/user");

exports.signup = (req, res) => {
  console.log(req.file);
  
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
                //uuid : uuidv4(),
                username : req.body.username,
                email : req.body.email,
                password : hash,
                //avatarUrl : req.file.filename,
              });
              if (req.file !== undefined) {
                user.avatarUrl = req.file.filename;
              }
              User.create(user, (err,data) => {
                if (err) 
                  res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the user."
                });
                else res.json({data})
            })
        })
}

 exports.login = (req, res) => {
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

            bcrypt.compare(req.body.password, result[0].password)
            .then( (comparedPassword) => {
                if(!comparedPassword) {
                    return res.status(401).json({error: "mot de passe erroné"});  
                }
                const token = jwt.sign({userId : result[0].id}, "token",
                    { expiresIn: "72h" });

                res.cookie("access_token", token, {
                        httpOnly: true,
                        secure: true
                    }).json({username: result[0].username}).status(200)
            })
        } 
    })
}

exports.logout = (req, res) => {
     res.clearCookie("access_token").status(200).send("L'utilisateur a été déconnécté");
} 

exports.getUser = (req, res) => {
  sql.query(`SELECT * FROM users WHERE username = "${req.params.user}"`, (err, result) => {
       if (err) 
         res.status(500).send({
         message:
           err.message || "Some error occurred while looking for the user."
       });
       else {
           if(result[0] == undefined) {
               return res.status(401).json({error: "utilisateur inconnu"});
           }
           res.status(200).json({username: result[0].username,
                                avatarUrl:result[0].avatarUrl})
       } 
   })
}

exports.getPrivateUserInfos = (req, res) => {
  sql.query(`SELECT * FROM users WHERE id = "${req.userId}"`, (err, result) => {
       if (err) 
         res.status(500).send({
         message:
           err.message || "Some error occurred while looking for the user."
       });
       else {
           if(result[0] == undefined) {
               return res.status(401).json({error: "utilisateur inconnu"});
           }

           res.status(200).json({result: result[0]})
       } 
   })
}

exports.modifyUser = (req, res) => {
 
      /*
      *@ param {object} reqBody - values in the body of the request
      *@ param {object} userModifications - an object containing userId and password hash if it needs to be modified

      */
      function checkAndSendUserModifications(reqBody, userModifications) {
        for (value in reqBody) { //check and add only valid values

          if(reqBody[value] !== "undefined") {

            if (value === "password" || value === "image") {
             //Do nothing
            } else {
              userModifications[value] = reqBody[value];
              
              if (req.file !== undefined) {
                userModifications.avatarUrl = req.file.filename;
              }
            }
          }
        }
        
       User.modifyUser(userModifications, (err,data) => {
         if (err) 
           res.status(500).send({
           message:
             err.message || "Some error occurred while modifying the post."
         });
         else res.send(data)
        });
      }


      if(req.body.password !== "undefined") {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const userModifications = {
              id: req.userId,
              password: hash,
           } 
           checkAndSendUserModifications(req.body, userModifications)
      })
      } else {
        const userModifications = {
          id: req.userId,
       } 
       checkAndSendUserModifications(req.body, userModifications)
      }
}

exports.deleteUser = (req, res) => {

    sql.query(`DELETE FROM users WHERE id = "${req.userId}"`, (err) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          res.status(200).json({message: "utilisateur supprimé"})
        });
}