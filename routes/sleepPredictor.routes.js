const express = require("express");
const {
  sleepPredictor,
  addSleepRecord,
  getAllSleepRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/sleepPredictor.controller");
const router = express.Router();

router.post("/predict", sleepPredictor);
router.post("/addRecord", addSleepRecord);
router.get("/getRecords", getAllSleepRecords);
router.put("/update/:id", updateRecord);
router.delete("/delete/:id", deleteRecord);

module.exports = router;
