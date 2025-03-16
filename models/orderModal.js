
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    checkoutDetails: {
      addressLine1: { type: "String", required: true },
      addressLine2: { type: "String", required: true },
      city: { type: "String", required: true },
      country: { type: "String", required: true },
      customerId: { type: "String", required: true },
      deliverCost: { type: "String", required: true },
      deliverMethod: { type: "String", required: true },
      fname: { type: "String", required: true },
      lname: { type: "String", required: true },
      state: { type: "String", required: true },
      zip: { type: "String", required: true },
    },
    customerId: { type: "String", required: true },
    productId: { type: "String", default: "none" },
    pic: { type: "String", required: true },
    price: { type: "String", required: true },
    productTitle: { type: "String", required: true },
    quantity: { type: "String", required: true },
    orderTotal: { type: "Number", required: true },
    orderTracking: { type: "String", default: "0000000" },
    orderStatus: { type: "String", default: "Pending" },
    shopId: { type: "String", required: true },
  },
  {
    timestapms: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;