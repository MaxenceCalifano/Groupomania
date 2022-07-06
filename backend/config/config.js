const dotenv = require("dotenv");
dotenv.config()

module.exports = 
{
  HOST: eu-cdbr-west-03.cleardb.net, //"localhost",
  USER: process.env.dbUser,
  PASSWORD: process.env.dbPassword,
  DB: heroku_4a07fe7768e41a0, //"groupomania"
}
