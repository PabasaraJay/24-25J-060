const express = require("express");
const router = express.Router();
const {
  submitSurvay
} = require("../controllers/userController");
const { predictBedtime } = require("../controllers/BedtimePredictController");



router.route("/submit_survay/:_id").post(submitSurvay);
router.route("/predict_bedtime/:_id").post(predictBedtime);



// router.route("/placeOrder").post(placeOrder);
// router.route("/getShopByShopId").post(getShopByShopId);
// router.route("/getAllProducts").post(getAllProducts);
// router.route("/getProductbyShopId").post(getProductbyShopId);
// router.route("/getOrdersByUserId").post(getOrdersByUserId);
// router.route("/deleteOrder").post(deleteOrder);
// router.route("/searchProduct").get(searchProduct);



module.exports = router;