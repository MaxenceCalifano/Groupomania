const multer = require("multer");

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
  };

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

    callback(null, "images"); // On passe le nom du dossier en destination
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_"); // Supprime les éventuels espaces et les remplace pars des underscore
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' +  extension);
    }
});

module.exports = multer({storage: storage}).single("image");