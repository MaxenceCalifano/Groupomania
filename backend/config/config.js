const dotenv = require("dotenv");
dotenv.config()

module.exports = 
{
  HOST: "localhost",
  USER: process.env.dbUser,
  PASSWORD: process.env.dbPassword,
  DB: "groupomania"
}
