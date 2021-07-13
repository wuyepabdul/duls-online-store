import slugify from "slugify";
import SubCategory from "../models/subCategory.js";

export const createSubCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subCategoryExist = await SubCategory.findOne({ name });

    if (subCategoryExist) {
      res.status(400).json("Subcategory already exist");
      return;
    }

    const savedSubCategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name),
    }).save();

    if (savedSubCategory) {
      res.json(`${name} subcategory created successfully`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};

export const listSubCategories = async (req, res) => {
  try {
    const allSubCategories = await SubCategory.find({}).sort({ createdAt: -1 });
    res.json(allSubCategories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error, try again later");
  }
};

export const getSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findOne({ slug: req.params.slug });

    if (subCategory) {
      res.json(subCategory);
    } else {
      res.status(404).json({ message: "Sub Category not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const sub = await SubCategory.findOne({ slug: req.params.slug });

    if (sub) {
      sub.name = req.body.name || sub.name;
      sub.parent = req.body.parent || sub.parent;
      sub.slug = slugify(req.body.name) || sub.slug;

      const updatedSub = await sub.save();
      res.json(updatedSub);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec();

    if (deleted) {
      res.json(deleted);
    } else {
      res.status(400).json({ message: "Error occured deleting Sub category" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
};
