const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
const randToken =  require("rand-token").uid;
const nodemailer = require("nodemailer");
const sql = require("../models/db");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();


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
                username : req.body.username,
                email : req.body.email,
                password : hash,
                //avatarUrl : req.file.filename,
              });
              if (req.file !== undefined) {
                user.avatarUrl = req.file.filename;
              } else {
                user.avatarUrl = 'admin.png1649961381928.png';
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
                const token = jwt.sign({userId : result[0].id,
                                        privilege: result[0].privileges},
                                         "token",
                                        { expiresIn: "72h" });

                res.cookie("access_token", token, {
                        httpOnly: true,
                        secure: true
                    }).json({username: result[0].username, privilege: result[0].privileges}).status(200)
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
exports.passwordReset = (req, res) => {
  sql.query(`SELECT * FROM users WHERE email = "${req.body.email}"`, (err, result) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while looking for the user."
      })
    }
    else {
      
      const token = randToken(16);
      console.log(token);

      const transporter = nodemailer.createTransport({
        service: "hotmail",
        secure: false,
        auth: {
          user: process.env.emailSender,
          pass: process.env.emailSenderPassword,

        }
      });

      const mailOptions = {
        from: process.env.emailSender,
        to: req.body.email,
        subject: "Réinitialisation de votre mot de passe Groupomania",
        html: `<p>Voici le lien pour réinitialiser votre mot de passe <a href="http://localhost:3001/reset-password/${token}/${result[0].id}">http://localhost:3001/reset-password/</a></p>`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
          console.log(error)
        } else {
          console.log("e-mail envoyé: " + info.response)
        }
      })
      const userModifications = {
        id : result[0].id,
        token: token,
        reinitialisationLink: new Date()
      }
      User.modifyUser(userModifications, (err,data) => {
        if (err) 
          res.status(500).send({
          message:
            err.message || "Some error occurred while modifying the user."
        });
       });
      
      res.status(200).json({result: "Si votre e-mail correspond à un utilisateur connu un e-mail de réinitialisation vient de vous être envoyé"})
  }
})
}

exports.newPassword = (req, res) => {
  sql.query(`SELECT * FROM users WHERE token = "${req.params.token}" AND id="${req.params.id}"`, (err, result) => {
    if (err) 
      res.status(500).send({
      message:
        err.message || "Some error occurred while looking for the user."
    });
    else {
      if (result.length === 0) {
        res.status(401).send({
          message:
            "Unauthorized request"
        });
      }  else {
        if((new Date() - result[0].reinitialisationLink)/1000/60 >= 60) {
          res.status(500).send({
            message: "Le lien de réinitisalisation est invalide ou a expiré"
          });
        } else {
          bcrypt
          .hash(req.body.password, 10)
          .then( hash => {
              const userModifications = {
                  id : result[0].id,
                  password : hash,
                  reinitialisationLink: null,
                  token: null
                };
              User.modifyUser(userModifications, (err,data) => {
                if (err) 
                  res.status(500).send({
                  message:
                    err.message || "Some error occurred while modifying the password."
                });
              });
              res.status(200).json({message:"Votre mot de passe a bien été mis à jour"})
          })
        }
      }
        
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
                //Delete previous avatar image file
                sql.query(`SELECT avatarURL FROM users WHERE id = ${req.userId}`, (err, resp) => {
                  if (err) {
                      console.log("error: ", err);
                      result(err, null);
                      return;
                    }
                    fs.unlink(`images/${resp[0].avatarURL}`, () => console.log("previous user avatar has been delete"))
                  });
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
  //Delete user avatar file
  sql.query(`SELECT avatarURL FROM users WHERE id = ${req.userId}`, (err, resp) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      fs.unlink(`images/${resp[0].avatarURL}`, () => console.log("previous user avatar has been delete"))
    });
  // Delete all data associated with the user
  sql.query(`DELETE FROM likes WHERE userId = "${req.userId}"`, (err) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    });
    sql.query(`DELETE FROM comments WHERE userId = "${req.userId}"`, (err) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
      });
      sql.query(`DELETE FROM posts WHERE userID = "${req.userId}"`, (err) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
        });

    // Then delete the user
    sql.query(`DELETE FROM users WHERE id = "${req.userId}"`, (err) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          res.status(200).json({message: "utilisateur supprimé"})
        });
}