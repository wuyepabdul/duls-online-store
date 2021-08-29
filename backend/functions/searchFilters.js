import Product from "../models/productModel.js";

export const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

export const handlePrice = async (req, res, price) => {
  try {
    if (price[0] > 0) {
      let products = await Product.find({
        price: { $gte: price[0], $lte: price[1] },
      })
        .populate("category", "_id name")
        .populate("subCategories", "_id name")
        .populate("postedBy", "_id name")
        .exec();

      res.json(products);
    }
  } catch (error) {
    console.log(error.message);
    res.json(500).json({ message: "Unexpected Error" });
  }
};

export const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subCategories", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.json(500).json({ message: "Unexpected Error" });
  }
};

export const handleSubCategory = async (req, res, subCategory) => {
  try {
    let products = await Product.find({ subCategories: subCategory })
      .populate("category", "_id name")
      .populate("subCategories", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.json(500).json({ message: "Unexpected Error" });
  }
};

export const handleShipping = async (req, res, shipping) => {
  try {
    let products = await Product.find({ shipping })
      .populate("category", "_id name")
      .populate("subCategories", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.json(500).json({ message: "Unexpected Error" });
  }
};
