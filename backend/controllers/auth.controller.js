import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
  try {
    const {fullName, username, email, password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({ error: "Invalid email format "});
    }

    const existingUser = await User.findOne({ username });//return only one doc 
    if(existingUser){ // ถ้ามี คือไม่ undified
      return res.status(400).json({ error: "Username is already taken" });
    } 

    const existingEmail = await User.findOne({ email });//return only one doc 
    if(existingEmail){ // ถ้ามี คือไม่ undified
      return res.status(400).json({ error: "Email is already taken" });
    } 

    if(password.length < 6) {
      return res.status(400).json({ error: "Passwod must be at least 6 characters long" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword// ค่าที่เหลือที่ไม่ได้ใส่ มาจาก user.model.js ที่ไม่ได้ require
    })

    if(newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();//save to mongoDb by save()
      
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg
      })
    }
    else {  
      req.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // user?.password if user if empty compare  password to ""

    if(!user || !isPasswordCorrect) { // user not found or password not correct
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullname,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg
    });

  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });// kill cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" }); 
  }
}