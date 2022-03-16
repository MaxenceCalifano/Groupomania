const express = require("express");
const router = express.Router();

 const postController = require("../controllers/post");
const auth = require("../middlewares/auth");


router.post("/", auth, postController.newPost);
router.get("/", auth, postController.getAllPosts);
router.put("/", auth, postController.modifyPost);
router.delete("/", auth, postController.deletePost);
 
module.exports = router;