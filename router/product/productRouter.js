const express = require("express");
const { createProduct, createSubCategory, getAllProducts } = require("../../controller/user/productController");





const productRouter = express.Router();

productRouter.post("/add-product",  createProduct);
productRouter.post("/add-sub-category",  createSubCategory);

productRouter.get("/all-product",  getAllProducts)
module.exports = productRouter;
