const express = require("express");

const path = require("path");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes =  require("./routes/comment");
const likesRoutes = require("./routes/like");
dotenv.config();

const app = express();
app.use(cookieParser()); // Pour accéder aux cookies

const corsOptions = {
  origin: true,
  credentials: true,
}
app.use(cors(corsOptions));

app.use(helmet({
  crossOriginResourcePolicy: false,
  hidePoweredBy: true,
})); //Appel tous les middleware d'Helmet mais autorise CORS

app.use(express.json()); //Intercepte toutes les requetes qui ont comme content-type application/json et met leur body à disposition

app.use("/images", express.static(path.join(__dirname, "images"))); // Sert les images quand une requete est faites au dossier images

app.use("/api/auth", userRoutes); // A chaque fois que l'ont va à api/auth, utiliser userRoutes
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likesRoutes)
app.get('/', (req, res) => {
    res.json({message: "ça marche"});
})
module.exports = app;
