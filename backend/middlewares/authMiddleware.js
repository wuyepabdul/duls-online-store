import admin from "../firebase/index.js";
import User from "../models/userModel.js";

export const authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// admin middleware
export const adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await User.findOne({ email }).exec();
    if (adminUser.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access Denied" });
    }
  } catch (error) {}
};
