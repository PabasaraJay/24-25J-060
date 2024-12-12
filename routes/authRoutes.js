const express = require("express");
const router = express.Router();
const { auth, register, me } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");


router.route("/me/:_id").get(protect,me)
router.route("/sign_in").post(auth)
router.route("/sign_up").post(register)
router.route("/register").post(register);

module.exports = router;