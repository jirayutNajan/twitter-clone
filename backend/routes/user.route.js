import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile, followUnfollowUser, getSuggestedUsers, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

//สำหรับ user ที่ login มี cookie แล้ว

router.get("/profile/:username", protectRoute, getUserProfile); // ไม่มี () เพราะเป็น callback function ไม่ได้ให้ excute ถ้ามี คือจะทำงาน
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser); //เอาไว้ follow/unfollow คนอื่น :id คือคนอื่น
router.post("/update", protectRoute, updateUser);

export default router;