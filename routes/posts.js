const express = require("express");
const postController = require("../controllers/post.controller");

const router = express.Router();

router.post("/", postController.save);
router.get("/", postController.showAllPosts);
router.get("/:id", postController.showPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
