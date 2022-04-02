const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");
const postController = require("../controllers/post");
const auth = require("../middlewares/auth");


router.post("/", auth, multer, postController.newPost);
router.get("/", auth, multer, postController.getAllPosts);
router.put("/", auth, postController.modifyPost);
router.delete("/", auth, postController.deletePost);
 
module.exports = router;