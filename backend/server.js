import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

console.log(process.env.MONGO_URI);

app.use(express.json());// to parse req.body ทำให้ req.body เป็น json 
app.use(express.urlencoded({ extended: true }));// ใช้ w-xxx form ได้
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectMongoDB();
});