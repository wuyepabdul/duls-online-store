import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${new Date()}`,
      resource_type: "auto", // jpeg, jpg, png
    });
    if (result) {
      res.json({
        public_id: result.public_id,
        // url: result.secure_url,
        url: result.url,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const removeImage = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (result, err) => {
    if (err) {
      console.log("cloudinary delete error", err);
      res.json(err);
    } else {
      console.log("cloudinary result", result);
      res.json(result);
    }
  });
};
