const express = require("express");
const router = express.Router();

const likeController = require("../controllers/likes");
const auth = require("../middlewares/auth");

router.get("/:postId", auth, likeController.getAllLikes)
router.post("/:postId", auth, likeController.likeUnlike)
 
module.exports = router;