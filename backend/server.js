import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import userRoutes from "./routes/user.route.js";
import getAllUsers from "./routes/allUser.route.js"

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5050;

console.log(process.env.MONGO_URI);

app.use(express.json());// to parse req.body ทำให้ req.body เป็น json 
app.use(express.urlencoded({ extended: true }));// ใช้ w-xxx form ได้
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//for debug
app.use("/users", getAllUsers);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectMongoDB();
});