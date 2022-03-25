const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");

const userController = require("../controllers/user");

router.post("/signup", multer, userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/test", multer, userController.test);

module.exports = router;