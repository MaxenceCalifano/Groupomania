const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

const userController = require("../controllers/user");

router.post("/signup", multer, userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/private/:user", auth, userController.getPrivateUserInfos);
router.get("/:user", auth, userController.getUser);
router.put("/:user", auth, multer, userController.modifyUser);
router.delete("/", auth, userController.deleteUser);

module.exports = router;