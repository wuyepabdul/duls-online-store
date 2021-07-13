import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "subscriber" },
    cart: { type: Array, default: [] },
    address: { type: String },
    // wishlist:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
