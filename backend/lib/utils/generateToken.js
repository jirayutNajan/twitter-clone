import jwt from "jsonwebtoken"

//สร้าง cookie
export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d'// expire date of jwt
  });

  res.cookie("jwt", token, {
    maxAge: 15*24*60*60*1000,// expire date of cookie
    httpOnly: true,// prevent xss attacks cross-site scripting attacks
    secure: process.env.NODE_ENV !== "development"
  });
}
