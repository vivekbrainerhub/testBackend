const Category = require("../../model/Product/categoryModel");
const Product = require("../../model/Product/productModel");
const SubCategory = require("../../model/Product/subCategoryModel");

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
      stock
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
      stock
    });

    // Save user to the database
    const productData = await product.save();
    await SubCategory.findByIdAndUpdate(
      subCategory, // Sub-category ID
      { $push: { products: product._id } }, // Add the product ID
      { new: true }
    );

    res.status(201).json({
      status: "success",
      data: productData,
      message: "Product Added sucessfull",
    });
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(400).json({ status: "error", data: error.message });
  }
};

// const getAllProducts = async (req, res) => {
//   try {
//     // Fetch all products from the database
//     const products = await Product.find()
//       .populate("category")
//       .populate("subCategory")
//       .exec();

//     res.status(200).json({
//       status: "success",
//       data: products,
//       message: "All products fetched successfully",
//     });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({
//       status: "error",
//       message: "Error fetching products",
//       error: error.message,
//     });
//   }
// };

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database with nested population
    const products = await Product.find()
      .populate({
        path: "category",
        populate: {
          path: "subCategories",
          model: "subCategory", // Adjust the model name as per your setup
        },
      })
      .populate({
        path: "subCategory",
        populate: {
          path: "products",
          model: "product", // Adjust the model name as per your setup
        },
      })
      .exec();

    res.status(200).json({
      status: "success",
      data: products,
      message: "All products fetched successfully",
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error fetching products",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
};
