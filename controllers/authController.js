const asyncHandler = require("express-async-handler");
const User = require("../models/userModal")
const genarateToken = require("../config/generateToken")

//user authenticate
const auth = asyncHandler(async (req, res) => {
  
    const { email, password } = req.body;
  
    if(!email){
        return res.status(400).send({ message: "Email required" });
    }
    if(!password){
        return res.status(400).send({ message: "password required" });
    }

    //check if user available in database
    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).send({ message: "Invalid Email or Password" });
    }

    if (!(await user.matchPassword(password))){
      return res.status(400).send({ message: "Invalid Email or Password" });
    }
  
  
    //if user available send response with matching password and genarate JWT token using user id
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        user: user,
        accessToken: genarateToken(user._id),
        success:true,
        message:"Logged in successfully"
      });
    }
    else {
      //send error message to frontend
      res.status(400).json({
        error: "Invalid Email or Password !!!",
      });
      throw new error("Invalid Email or Password !!!");
    }
});

const register = asyncHandler(async (req, res) => {

    const { 
      fullName,
      email,
      age,
      occupation,
      gender,
      height,
      weight, 
      password
    } = req.body;
    
  
    //backend validation for body data
    if (!fullName,
      !email,
      !age,
      !occupation,
      !gender,
      !height,
      !weight,
      !password) {
      res.send(400);
      throw new error("Please enter all the required fields!!!");
    }
  
    
    const userExist = await User.findOne({ email });
  
   
    if (userExist) {
      console.log("User already exist!!!".red.bold);
      res.status(400).json({
        error: "User already exist !!!",
      });
      throw new error("User already exist!!!");
    }
  
    //create new user in database
    const user = await User.create({
      fullName,
      email,
      age,
      occupation,
      gender,
      height,
      weight, 
      password
    });
  
    //send response to frontend
    if (user) {
      res.status(201).json({
        user: user,
        success:true,
        message:'User Registered'
      });
    } else {
      //send error message to frontend
      res.status(400).json({
        user:null,
        success:false,
        message: "Failed to Register User !!!",
      });
      throw new error("Failed to Register User !!!");
    }
});

const me = asyncHandler(async (req,res) => {

  if(!req.user){
    res.status(401);
      throw new Error("Not authorized, no user");
  }
  else{
    res.status(200).json({
      user: req.user
    });
  }

});


module.exports = { auth, register, me }
