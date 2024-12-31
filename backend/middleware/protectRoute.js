import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // ดึง cookie จาก request
    if(!token) { // check if user have token
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ตรวจสอบว่า token ถูกมั้ย เป็นตัวเดียวกับ key เรามั้ย

    if(!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");// return user แต่ไม่ต้อง return password ใน object

    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;// กำหนด req.user ไปให้
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}