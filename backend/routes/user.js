const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");

const userController = require("../controllers/user");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
//router.get("/logout", userController.logout);

module.exports = router;