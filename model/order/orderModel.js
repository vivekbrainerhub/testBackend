const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Reference to the User model
      required: true
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'orderItem',
      required: true
    }],
    totalAmount: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    orderDate: {
      type: Date,
      default: Date.now
    }
  });
  
const order = mongoose.model("order", orderSchema);

module.exports = order;
  