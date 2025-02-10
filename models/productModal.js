const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productTitle: { type: "String", required: true },
    categoryName: { type: "String", required: true },
    description: { type: "String", require: true },
    stock: { type: "String", default: "0" },
    shopId: { type: "String", require: true },
    price: { type: "Number", default: "0" },
    ratings: [{ type: "String", default: "none" }],
    pic: {
      type: "String",
      require: true,
      default:
        "https://res.cloudinary.com/cake-lounge/image/upload/v1653393914/icons8-product-100_zr2jfl.png",
    },
  },
  {
    timestapms: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;