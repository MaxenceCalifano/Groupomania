const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  try {
    console.log(req.cookies)

    const token = req.cookies.access_token;
    const decodedToken = jwt.verify(token, "token");
    const userId = decodedToken.userId;


    if (!userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};