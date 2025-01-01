import express from "express";
import { getAllNotificationsDebug, getAllPostsDebug, getAllUsersDebug } from "../controllers/debug.controller.js";

const router = express.Router();

router.get("/users", getAllUsersDebug);

router.get("/posts", getAllPostsDebug);

router.get("/notifications", getAllNotificationsDebug);

export default router;