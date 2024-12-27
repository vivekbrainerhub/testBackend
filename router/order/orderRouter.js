const express = require("express");
const { createOrder, getOrder, getAllOrder } = require("../../controller/order/orderController");

const orderRouter = express.Router();
orderRouter.post("/add-order",  createOrder);
orderRouter.get('/order/:orderId', getOrder);
orderRouter.get('/order', getAllOrder);
module.exports = orderRouter;
