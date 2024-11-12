const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./config.env" });
const authRoutes = require("./routes/authRoutes");
const faceScanRoutes = require("./routes/faceScan.routes");
const userRoutes = require("./routes/userRoutes");
const sleepPredictorRoutes = require("./routes/sleepPredictor.routes");
const sleepInterventionRoutes = require("./routes/sleepIntervention.routes");
const connectDB = require("./DB/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5005;

app.use(
  cors({
    origin: process.env.CLIENT_API || "http://192.168.1.82:8081", // Replace with your frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Api is running Bedtime Project");
});

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);
if (server) {
  console.log("Success".green.bold);
}

app.use(`/api/auth`, authRoutes);
app.use(`/api/face`, faceScanRoutes);
app.use(`/api/user`, userRoutes);
app.use(`/api/sleep`, sleepPredictorRoutes);
app.use(`/api/intervention`, sleepInterventionRoutes);

app.use(errorHandler);
app.use(notFound);

module.exports = { app, server };
