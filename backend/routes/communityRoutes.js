const express = require("express");
const router = express.Router();
const { getAllPosts, createPost, likePost, replyPost } = require("../controllers/communityController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getAllPosts);
router.post("/", authMiddleware, createPost);
router.put("/:id/like", authMiddleware, likePost);
router.post("/:id/reply", authMiddleware, replyPost);

module.exports = router;
