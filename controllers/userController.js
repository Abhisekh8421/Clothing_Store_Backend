import { userModel } from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exists",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password!!! please enter valid password",
      });
    }
    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
      });
    }

    
  } catch (error) {
    console.log("register error", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//register user
export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if ([email, name, password].some((field) => field.trim() === "")) {
      console.log("all fields are required");
      return res.json({
        success: false,
        message: "All fields are required!!!",
      });
    }

    //checking user already exist or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    //validating email format & strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hasedpassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hasedpassword,
    });
    const token = createToken(newUser._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("register error", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//admin login
export const adminLogin = async (req, res) => {};
