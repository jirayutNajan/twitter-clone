import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import mongoose from "mongoose";

export const getAllUsersDebug = async (req, res) => {
  const users = await User.find().populate({
    path: "likedPosts",
    select: "text img"
  }).populate({
    path: "following followers",
    select: "username"
  });
  res.status(200).json(users);
};

export const getAllPostsDebug = async (req, res) => {
  const posts = await Post.find().sort({ createAt: -1 }).populate({
    path: "user",
    select: "username"
  })
  .populate({
    path: "comments.user",
    select: "username"
  });
  res.status(200).json(posts);
};

export const getAllNotificationsDebug = async (req, res) => {
  const notifications = await Notification.find()
  .populate({
    path: "from",
    select: "username"
  })
  .populate({
    path: "to",
    select: "username"
  });

  res.status(200).json(notifications);
};