const Category = require("../../model/Product/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { categoryName, description } = req.body;

    const category = new Category({
      categoryName,
      description,
    });

    // Save user to the database
    const categoryData = await category.save();

    res.status(201).json({
      status: "success",
      data: categoryData,
      message: "Category Added sucessfull",
    });
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(400).json({ status: "error", data: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find().exec();

    res.status(200).json({
      status: "success",
      data: categories,
      message: "All categories fetched successfully",
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
