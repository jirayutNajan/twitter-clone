import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json( users );
})

export default router;