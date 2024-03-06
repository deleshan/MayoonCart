const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
    trim: true,
    maxLength: [100, "Product name can't to be more then 100 character"],
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter the category of the product"],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "computer",
        "Accessories",
        "Headphones",
        "Food",
        "book",
        "clothes/shoes",
        "Beauty/Health",
        "Outdoor",
        "Home",
        "Sports",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "please enter the seller of the product"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [20, "Product stock con not exceed 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let schema = mongoose.model("Product", productSchema);

module.exports = schema;
