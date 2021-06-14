import Category from "../models/categoryModel.js";
import slugify from "slugify";

//create a category controller
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExist = await Category.findOne({ name }).exec();
    if (categoryExist) {
      res.status(400).json({ message: "Category already exist" });
    } else {
      const category = await new Category({ name, slug: slugify(name) });
      if (category) {
        res
          .status(201)
          .json({ message: `${name} category created successfully` });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
};

//list  categories controller
export const listCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({})
      .sort({ createdAt: -1 })
      .exec();
    res.json(allCategories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
};

//get category by slug controller
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
};

//update a category controller
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    // update category
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: slugify(name) },
      { new: true }
    );
    if (updated) {
      res.json(updated);
    } else {
      res.status(400).json({ message: "Error occured updating category" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
};

//delete a category controller
export const deleteCategory = async (req, res) => {
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
};
