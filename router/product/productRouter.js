const express = require("express");
const { createProduct, getAllProducts } = require("../../controller/product/productController");

const productRouter = express.Router();
productRouter.post("/add-product",  createProduct);
productRouter.get("/all-product",  getAllProducts)
module.exports = productRouter;
