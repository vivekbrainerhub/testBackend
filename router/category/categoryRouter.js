const express = require("express");
const { createCategory, getAllCategories } = require("../../controller/user/categoryController");

const categoryRouter = express.Router();
categoryRouter.post("/add-category", createCategory);
categoryRouter.get("/all-category", getAllCategories);

module.exports = categoryRouter;
