const express = require("express");
const {
  createCategory,
  getAllCategories,
  createSubCategory,
  getAllSubCategories,
} = require("../../controller/category/categoryController");

const categoryRouter = express.Router();
categoryRouter.post("/add-category", createCategory);
categoryRouter.get("/all-category", getAllCategories);
categoryRouter.post("/add-sub-category", createSubCategory);
categoryRouter.get("/all-sub-category", getAllSubCategories);

module.exports = categoryRouter;
