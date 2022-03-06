const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");
const auth = require("../middlewares/auth");

router.post("/", postController.newPost);
router.get("/", auth, postController.getAllPosts);

module.exports = router;