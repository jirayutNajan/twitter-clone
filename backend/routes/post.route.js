import express, { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  deletePost,
  commentOnPost,
  likeUnlikePost,
  getAllPosts,
  getLikedPosts,
  getFollwingPosts,
  getUserPosts
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);

router.get("/following", protectRoute, getFollwingPosts);

router.get("/likes/:id", protectRoute, getLikedPosts);

router.get("/users/:username", protectRoute, getUserPosts);

router.post("/create", protectRoute, createPost); // protectRoute for only user that login

router.post("/like/:id", protectRoute, likeUnlikePost);

router.post("/comment/:id", protectRoute, commentOnPost);

router.delete("/:id", protectRoute, deletePost);

export default router;
