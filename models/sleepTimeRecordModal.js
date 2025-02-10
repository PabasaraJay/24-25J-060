const mongoose = require("mongoose");

const sleepTimeRecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  sleepDuration: {
    type: Number,
    required: true,
  },
  dailyStepCount: {
    type: Number,
    required: false,
  },
});

const SleepTimeRecord = mongoose.model(
  "SleepTimeRecord",
  sleepTimeRecordSchema
);

module.exports = SleepTimeRecord;
