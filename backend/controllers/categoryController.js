import Category from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import SubCategory from "../models/subCategory.js";
import Product from "../models/productModel.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExist = await Category.findOne({ name });
    const slugExist = await Category.findOne({ slug: slugify(name) });

    if (categoryExist || slugExist) {
      res.status(400).json("Category already exist");
    } else {
      const savedCategory = await new Category({
        name,
        slug: slugify(name),
      }).save();
      if (savedCategory) {
        res.json(`${name} category created successfully`);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

export const listCategories = asyncHandler(async (req, res) => {
  try {
    const allCategories = await Category.find({})
      .sort({ createdAt: -1 })
      .exec();
    res.json(allCategories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error, try again later");
  }
});

export const getCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({ category })
      .populate("category")
      .populate("postedBy", "_id name")
      .exec();
    if (category) {
      res.json({ category, products });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: slugify(name) },
      { new: true }
    ).exec();

    if (updated) {
      res.json(updated);
    } else {
      res.status(400).json({ message: "Error occured updating category" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    if (deleted) {
      res.json(deleted);
    } else {
      res.status(400).json({ message: "Error occured deleting category" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

export const getCategorySubs = asyncHandler(async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ parent: req.params.id });
    if (subCategories) {
      res.json(subCategories);
    } else {
      res.status(400).json({ message: "Please Select a Category" });
    }
  } catch (error) {
    console.log("message", error.message);
    res.status(500).json({ message: error.message });
  }
});
