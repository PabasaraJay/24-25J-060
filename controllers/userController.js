const asyncHandler = require("express-async-handler");
const User = require("../models/userModal")
const genarateToken = require("../config/generateToken")



const submitSurvay = asyncHandler(async (req, res) => {
  const { _id } = req.params; // Extract user ID from URL params
  const {
    sleepingDisorder,
    sleepingDisorderNote,
    physicalDisability,
    physicalDisabilityNote,
    workEnvironmentImpact,
  } = req.body; // Extract survey data from request body

  try {
    // Find the user by ID and update their survey data
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          sleepingDisorder,
          sleepingDisorderNote,
          physicalDisability,
          physicalDisabilityNote,
          workEnvironmentImpact,
          survay_completed: true, // Mark survey as completed
        },
      },
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found",success:false, data:null });
    }
    
    // Send the updated user data as the response
    res.status(200).json({
      message: "Survey submitted successfully",
      data: updatedUser,
      success:true
    });
  } catch (error) {
    console.error("Error submitting survey:", error);
    res.status(500).json({ message: "Internal server error", success:false });
  }
});


// const getAllProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find();

//   if (products && products.length > 0) {
//     console.log("Product fetched!!!".green.bold);
//     //send data to frontend in json format
//     res.status(201).json({
//       Products: products,
//     });
//   } else {
//     console.log("Failed fetch products !!!".red.bold);
//     //send error message to frontend
//     res.status(400).json({
//       error: "Failed to fetch products !!!",
//     });
//     // throw new error("Failed to fetch products !!!");
//   }
// });

// // const addCart = asyncHandler(async (req, res) => {
// //   const {
// //     productId,
// //     productImage,
// //     productPrice,
// //     productTitle,
// //     customerId,
// //     shopId,
// //     quantity,
// //   } = req.body;

// //   if (
// //     !productId ||
// //     !productImage ||
// //     !productPrice ||
// //     !productTitle ||
// //     !customerId ||
// //     !shopId ||
// //     !quantity
// //   ) {
// //     res.send(400);
// //     throw new error("Please enter all the fields!!!");
// //   }

// //   const cart = await Cart.create({
// //     productId,
// //     productImage,
// //     productPrice,
// //     productTitle,
// //     customerId,
// //     shopId,
// //     quantity,
// //   });

// //   if (cart) {
// //     console.log("Added to cart!!!".green.bold);
// //     res.status(201).json({
// //       _id: cart._id,
// //       productId: cart.productId,
// //       productImage: cart.productImage,
// //       productPrice: cart.productPrice,
// //       productTitle: cart.productTitle,
// //       customerId: cart.customerId,
// //       shopId: cart.shopId,
// //       quantity: cart.quantity,
// //     });
// //   } else {
// //     console.log("Failed to adding cart !!!".red.bold);
// //     res.status(400).json({
// //       error: "Failed to adding cart !!!",
// //     });
// //     throw new error("Failed to adding cart !!!");
// //   }
// // });

// // const getCartList = asyncHandler(async (req, res) => {
// //   const { customerId } = req.body;

// //   if (!customerId) {
// //     res.send(400);
// //     throw new error("No Customer ID!!!");
// //   }

// //   const cartList = await Cart.find({ customerId: { $in: customerId } });

// //   if (cartList) {
// //     res.send(cartList);
// //     console.log(cartList);
// //   } else {
// //     console.log("Invalid shopId for fetch product".red.bold);
// //     res.status(401);
// //     throw new error("Invalid shopId for fetch product");
// //   }
// // });

// // const removeCartItem = asyncHandler(async (req, res) => {
// //   const { id } = req.body;

// //   if (!id) {
// //     console.log("Id is null".red.bold);
// //     res.status(400).json({
// //       error: "item id is null",
// //     });
// //     throw new error("Error while deleting item !!!");
// //   } else {
// //     try {
// //       //find user by id and delete fron database
// //       const cart = await Cart.findOneAndDelete({ _id: id });

// //       //send success response message to the frontend
// //       if (cart) {
// //         res.status(201).json({
// //           _id: id,
// //         });
// //         console.log("Item deleted".red.bold);
// //       }
// //     } catch (error) {
// //       //send error response message to the frontend
// //       res.status(400).json({
// //         error: "Fail to delete item !!!",
// //       });
// //       throw new error("Error while deleting item !!!" + error.message);
// //     }
// //   }
// // });

// const getOrdersByUserId = asyncHandler(async (req,res)=>{
//   const { userId } = req.body;

//   if (!userId) {
//     res.sendStatus(400);
//     throw new error("No Customer ID!!!");
//   }

//   const orderList = await Order.find({ customerId: { $in: userId } });

//   if (orderList) {
//     res.send(orderList);
//     console.log(orderList);
//   } else {
//     console.log("Invalid user Id for fetch orders".red.bold);
//     res.status(401);
//     throw new error("Invalid user Id for fetch orders");
//   }
// })

// const deleteOrder = asyncHandler(async (req, res) => {
//   const { orderId } = req.body;
// console.log(orderId);
//   if (!orderId) {
//     res.status(400);
//     throw new error("Required data not received into backend request!!!");
//   } else {
//     const deleteOrder = await Order.findOneAndDelete({ _id: orderId });

//     if (deleteOrder) {
//       res.status(201).json({
//         _id: deleteOrder._id,
//         productName: deleteOrder.productTitle,
//       });
//     } else {
//       console.log("Errorrrrrrrrrrrrrrr");
//       res.status(400);
//       throw new error("Product not deleted !!!");
//     }
//   }
// });

// const searchProduct = asyncHandler(async (req, res) => {
//   //getting keyword
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { productTitle: { $regex: req.query.search, $options: "i" } }, //assign keyword find in productTitle
//           { categoryName: { $regex: req.query.search, $options: "i" } }, //assign keyword find in categoryName
//           { description: { $regex: req.query.search, $options: "i" } }, //assign keyword find in description
//         ],
//       }
//     : {};

//   //find user in databse by keyword
//   const product = await Product.find(keyword);

//   if(product){
//     console.log(product);
//   }
//   else{
//   console.log("No items.............");
//   }
//   //send data to frontend
//   res.send(product);
// });

// const getShopByShopId = asyncHandler(async(req,res) =>{
//   const { shopId } = req.body;

//   console.log(shopId);

//   if (!shopId) {
//     res.send(400);
//     throw new error("Please add shop Id!!!");
//   }

//   const shop = await Shop.findOne({ _id:shopId });

//   if (shop) {
//     console.log("Found!!!".green.bold);
//     res.status(201).json({
//       _id: shop._id,
//       userId: shop.userId,
//       shopName: shop.shopName,
//       shopDescription: shop.shopDescription,
//       shopAddress: shop.shopAddress,
//       ratings: shop.ratings,
//       shopImage: shop.shopImage,
//     });
//   } else {
//     console.log("Failed to Get Shop !!!".red.bold);
//     res.status(400).json({
//       error: "Failed to Get Shop !!!",
//     });
//     throw new error("Failed to Get Shop !!!");
//   }
// });

// const getProductbyShopId = asyncHandler(async(req,res)=>{
//   const { shopId } = req.body;

//   if (!shopId) {
//     res.send(400);
//     throw new error("No Shop ID!!!");
//   }

//   const productList = await Product.find({ shopId: { $in: shopId } });

//   if (productList) {
//     res.send(productList);
//   } else {
//     console.log("Invalid shop Id for fetch products".red.bold);
//     res.status(401);
//     throw new error("Invalid shop Id for fetch orders");
//   }
// })

module.exports = {
  submitSurvay
};