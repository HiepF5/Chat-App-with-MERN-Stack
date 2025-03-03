import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    //Generate JWT token and send it in response
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Create new user
    const boyProfilePricture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePricture = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePricture : girlProfilePricture,
    });
    if (newUser) {
      //Generate JWT token and send it in response
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
