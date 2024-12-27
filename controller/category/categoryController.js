const Category = require("../../model/Product/categoryModel");
const SubCategory = require("../../model/Product/subCategoryModel");

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
const createSubCategory = async (req, res) => {
  try {
    const { subCategoryName, description, category } = req.body;

    const subCategory = new SubCategory({
      subCategoryName,
      description,
      category,
    });

    // Save user to the database
    const categorySubData = await subCategory.save();
    await Category.findByIdAndUpdate(
      category, // Parent category ID
      { $push: { subCategories: categorySubData._id } }, // Add the sub-category ID
      { new: true }
    );

    res.status(201).json({
      status: "success",
      data: categorySubData,
      message: "Sub Category Added sucessfull",
    });
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(400).json({ status: "error", data: error.message });
  }
};

const getAllSubCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await SubCategory.find().exec();

    res.status(200).json({
      status: "success",
      data: categories,
      message: "All sub categories fetched successfull",
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error fetching sub categories",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  createSubCategory,
  getAllSubCategories,
};
