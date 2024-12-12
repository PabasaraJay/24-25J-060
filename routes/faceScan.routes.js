const express = require("express");
const multer = require("multer");
const path = require("path");
const { faceScanController } = require("../controllers/faceScan.controller");

const faceScanRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

faceScanRouter.post("/scanFace", upload.single("image"), faceScanController);

module.exports = faceScanRouter;
