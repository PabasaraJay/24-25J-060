const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const shopSchema = mongoose.Schema(
  {
    userId: { type: "String", required: true },
    shopName: { type: "String", required: true },
    shopDescription: { type: "String", required: true },
    shopAddress: { type: "String", required: true },
    ordersCount: { type: "Number", default: 0 },
    payment: { type: "Number", default: 0 },
    ratings: [{ type: "String", default: "none" }],
    shopImage: {
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

// shopSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   } else {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
// });



const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;