import jwt from "jsonwebtoken";
export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // prevent XSS (Cross-Site Scripting) attacks
    secure: process.env.NODE_ENV === "production", // cookie only works in https
    sameSite: "strict", // CORS attacks cross-site request forgery
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
  });

};