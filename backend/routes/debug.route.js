import express from "express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find().populate({
    path: "likedPosts",
    select: "text img"
  }).populate({
    path: "following followers",
    select: "username"
  });
  res.status(200).json(users);
})

router.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createAt: -1 }).populate({
    path: "user",
    select: "username"
  })
  .populate({
    path: "comments.user",
    select: "username"
  });
  res.status(200).json(posts);
});

export default router;