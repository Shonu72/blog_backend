const express = require("express");
const postController = require("../controllers/post.controller");
const checkAuthMiddleWare = require("../middleware/check-auth")

const router = express.Router();

router.post("/create", checkAuthMiddleWare.checkAuth, postController.save);
router.get("/showallpost", postController.showAllPosts);
router.get("/showpost/:id", postController.showPost);
router.patch("/updatepost/:id", checkAuthMiddleWare.checkAuth, postController.updatePost);
router.delete("/deletepost/:id", checkAuthMiddleWare.checkAuth, postController.deletePost);

module.exports = router;
