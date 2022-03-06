const express = require("express");

const db = require("./models/index");


db.sequelize.sync();

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

dotenv.config();

const app = express();
app.use(cookieParser()); // Pour accéder aux cookies

const corsOptions = {
  origin: true,
  credentials: true,
}
app.use(cors(corsOptions));

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001"); // Permet d'accéder à l'API depuis n'importe quelle origine ('*')
  res.setHeader("Access-Control-Allow-Credentials", "true"); 
  //res.setHeader("credentials", "true"); 

  
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Access-Control-Allow-Credentials, Credentials, Cookie"
  ); //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  next();
}); */

app.use(express.json()); //Intercepte toutes les requetes qui ont comme content-type application/json et met leur body à disposition
//app.use("api/auth", userRoutes);
app.use("/api/auth", userRoutes); // A chaque fois que l'ont va à api/auth, utiliser userRoutes
app.use("/api/", postRoutes);
app.get('/', (req, res) => {
    res.json({message: "ça marche"});
})
module.exports = app;
