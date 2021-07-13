import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signinController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      const matchedPassword = await bcrypt.compare(
        password,
        userExist.password
      );
      if (matchedPassword) {
        res.status(200).json({
          role: userExist.role,
          name: userExist.name,
          email: userExist.email,
          _id: userExist._id,
          cart: userExist.cart,
          token: generateToken(userExist._id),
        });
      }
    } else {
      res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: { data: error.message } });
  }
});

export const signupController = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      res.status(400).json({ message: "User already exist" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    if (savedUser) {
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        cart: savedUser.cart,
        role: savedUser.role,
        token: generateToken(savedUser._id),
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});
