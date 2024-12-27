const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Ordered', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Ordered'
    }
  });
  
  
const orderItem = mongoose.model("orderItem", orderItemSchema);

module.exports = orderItem;