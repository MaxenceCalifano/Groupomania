const express = require("express");
const router = express.Router();

 const commentController = require("../controllers/comment");
const auth = require("../middlewares/auth");



router.post("/:id", auth, commentController.newComment) // Goes to the path of the post
router.get("/:id", auth, commentController.getAllPostComments);
/*router.put("/", auth, postController.modifyPost);
router.delete("/", auth, postController.deletePost); */
 
module.exports = router;