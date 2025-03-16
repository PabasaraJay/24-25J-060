const jwt = require("jsonwebtoken");
const User = require("../models/userModal");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  const {_id} = req.params

  if (_id ) {
    try {

      req.user = await User.findById(_id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!_id) {
    res.status(401);
    throw new Error("Not authorized, no id");
  }
});

module.exports = { protect };