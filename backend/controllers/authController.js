import User from "../models/userModel.js";

// create or update a user controller
export const createOrUpdateUser = async (req, res) => {
  try {
    const { email, name, picture } = req.user;
    // update user if user exist
    const user = await User.findOneAndUpdate(
      { email },
      { name, picture },
      { new: true }
    );
    if (user) {
      res.json(user);
    } else {
      // create new user if no user
      const newUser = await new User({
        email,
        name,
        picture,
      }).save();
      res.json(newUser);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again" });
  }
};

// get current user controller
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again" });
  }
};

// get current user controller
export const getCurrentAdminUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again" });
  }
};
