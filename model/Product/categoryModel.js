const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subCategory',
    },
  ],
}, { timestamps: true })

const category = mongoose.model('category', categorySchema)

module.exports=category
