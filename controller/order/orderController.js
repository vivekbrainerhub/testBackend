const OrderItem = require("../../model/order/orderItemModel");
const Order = require("../../model/order/orderModel");
const Product = require("../../model/Product/productModel");

const createOrder = async (req, res) => {
  try {
    const { user, items, totalAmount, orderStatus } = req.body;

    const orderItems = await OrderItem.insertMany(items);
    const extractedData = orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    console.log(extractedData);
    for (const item of extractedData) {
      const { productId, quantity } = item;

      // Find the product to check stock availability
      const product = await Product.findById(productId);

      if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        continue; // Skip this item
      }

      if (product.stock < quantity) {
        throw new Error(`Product ${product.productName} is out of stock.`);
      }

      // Update the stock of the product
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $inc: { stock: -quantity } }, // Decrement stock by quantity
        { new: true } // Return the updated document
      );
    }
    const orderData = new Order({
      user: user,
      items: orderItems.map((item) => item._id),
      totalAmount,
      orderStatus,
    });

    const order = await orderData.save();

    res.status(201).json({
      status: "success",
      data: order,
      message: "Order created successfully",
    });
  } catch (error) {
    // Handle errors
    console.log(error);
    res.status(400).json({ status: "error", data: error.message });
  }
};
const getOrder = async (req, res) => {
  const { orderId } = req.params; // Get orderId from the URL parameters

  try {
    // Find the order and populate the user and items
    const order = await Order.findById(orderId)
      .populate("user", "name email") // Populate the user's name and email
      .populate({
        path: "items",
        populate: {
          path: "productId",
        },
      });

    if (!order) {
      return res
        .status(404)
        .json({ status: "error", message: "Order not found" });
    }

    res.status(200).json({
      status: "success",
      data: order,
      message: "Order fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
const getAllOrder = async (req, res) => {

    try {

      const order = await Order.find()
        .populate('user') 
        .populate({
          path: 'items',
          populate: {
            path: 'productId',  
          }
        });

      if (!order) {
        return res.status(404).json({ status: 'error', message: 'Order not found' });
      }

      res.status(200).json({
        status: 'success',
        data: order,
        message: 'Order fetched successfully'
      });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  };
module.exports = {
  createOrder,
  getOrder,
  getAllOrder
};
