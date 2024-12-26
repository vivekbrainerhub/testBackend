const Category = require("../../model/Product/categoryModel");
const Product = require("../../model/Product/productModel");
const SubCategory = require("../../model/Product/subCategoryModel");



const createSubCategory = async (req, res) => {
  try {
    const { subCategoryName, description, categoryId } = req.body;

    const category = new SubCategory({
      subCategoryName,
      description,
      categoryId,
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

const createProduct = async (req, res) => {
  try {
    const {
      imageUrl,
      discountPercentage,
      description,
      price,
      productName,
      actualSellingPrice,
      subCategory,
      category,
    } = req.body;

    const product = new Product({
      imageUrl,
      discountPercentage,
      description,
      price,
      productName,
      actualSellingPrice,
      subCategory,
      category,
    });

    // Save user to the database
    const productData = await product.save();

    res.status(201).json({
      status: "success",
      data: productData,
      message: "Product Added sucessfull",
    });
  } catch (error) {
    // Handle errors
    console.log(error)
    res.status(400).json({ status: "error", data: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find()
      .populate('category') // Populate category name
      .populate('subCategory') // Populate sub-category name
      .exec();

    res.status(200).json({
      status: 'success',
      data: products,
      message: 'All products fetched successfully',
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching products',
      error: error.message,
    });
  }
};



module.exports = {
  createProduct,
  createSubCategory,
  getAllProducts
};
