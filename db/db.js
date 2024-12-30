const mongoose = require("mongoose");
const colors = require("colors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (process.env.NODE_ENV !== 'test') {
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }

  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  } 
};

module.exports = connectDB;