require("dotenv").config();
const express = require("express");
const { connectDB } = require("./database/mongoose");

const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
const userRouter = require("./router/user/UserRouter");
const productRouter = require("./router/product/productRouter");
const categoryRouter = require("./router/category/categoryRouter");
const orderRouter = require("./router/order/orderRouter");

connectDB();

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(orderRouter);

app.listen(3002, () => {
  console.log(`Server Started at ${3002}`);
});
