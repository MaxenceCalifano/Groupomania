const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");

router.post("/", postController.newPost);
//router.post("/", postController.);

module.exports = router;