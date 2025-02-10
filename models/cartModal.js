const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    productId: { type: "String", required: true },
    quantity: { type: "String", required: true },
    productPrice: { type: "String", required: true },
    productTitle: { type: "String", required: true },
    customerId: { type: "String", required: true },
    shopId: { type: "String", required: true },
    productImage: {
      type: "String",
      require: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestapms: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;