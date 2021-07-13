import slugify from "slugify";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const productExist = await Product.findOne({
      slug: slugify(req.body.title),
    });

    if (productExist) {
      res
        .status(400)
        .json({ message: "A Product already exist with this name" });
    } else {
      req.body.slug = slugify(req.body.title);
      const newProduct = await new Product(req.body).save();
      res.json(newProduct);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subCategories")
      .sort([["createdAt", "desc"]])
      .exec();

    if (products.length === 0) {
      res.json({ message: "No products created" });
    } else {
      res.json(products);
    }
  } catch (error) {
    console.log(error.message);
  }
});

export const listNewArrivals = asyncHandler(async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 4;
    const skip = (currentPage - 1) * perPage;

    const products = await Product.find({})
      .skip(skip)
      .populate("category")
      .populate("subCategories")
      .sort([[sort, order]])
      .limit(perPage);

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.json({ message: "Could not fetch products" });
  }
});

export const listProducts = asyncHandler(async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 4;
    const skip = (currentPage - 1) * perPage;

    const products = await Product.find({})
      .skip(skip)
      .populate("category")
      .populate("subCategories")
      .sort([[sort, order]])
      .limit(perPage);

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.json({ message: "Could not fetch products" });
  }
});

export const getTotalProducts = asyncHandler(async (req, res) => {
  try {
    const totalProducts = await Product.find({})
      .estimatedDocumentCount()
      .exec();
    res.json(totalProducts);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    let productSlug = req.params.slug;
    const product = await Product.findOne({ slug: productSlug });

    if (product) {
      const deleted = await product.remove();
      res.json(deleted);
    } else {
      res.status(404).json({ message: "Product does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, try again later" });
  }
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  try {
    let productSlug = req.params.slug;
    const product = await Product.findOne({ slug: productSlug })
      .populate("category")
      .populate("subCategories")
      .exec();

    if (product) {
      res.json(product);
    } else {
      res.status(404).json("Product does not exist");
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const updateInfo = req.body;
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      updateInfo,
      { new: true }
    ).exec();
    res.json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Product update failed" });
  }
});

export const rateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    let existingRating = product.ratings.find(
      (rating) => rating.postedBy.toString() === user._id.toString()
    );

    if (!existingRating) {
      let newRating = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { ratings: { star, postedBy: user._id } },
        },
        { new: true }
      ).exec();
      res.json(newRating);
    } else {
      const updatedRating = await Product.updateOne(
        { ratings: { $elemMatch: existingRating } },
        { $set: { "ratings.$.star": star } },
        { new: true }
      ).exec();

      res.json(updatedRating);
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Unexpected Error, try again later" });
  }
});

export const listRelatedProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).exec();

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .limit(4)
      .populate("category")
      .populate("subCategories")
      .populate("postedBy")
      .exec();

    res.json(relatedProducts);
  } catch (error) {
    console.log(error.message);
    res.json(500).json({ message: "Unexpected Error" });
  }
});
