// import admin from "../firebase/index.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authCheck = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded) {
        req.user = await User.findById(decoded.id).select("-password");
      } else {
        res.status(422).json({ message: "Invalid token" });
      }
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ message: "Token has Expired" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Access Denied: No token" });
  }
};

/* export const authCheck = async (req, res, next) => {
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
}; */

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
