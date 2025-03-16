const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SleepInterventionSchema = new Schema({
  userId: { type: String, required: true },
  dateAndTime: { type: Date, required: true },
  emotion: { type: String, required: true },
  stress_level: { type: String, required: true },
  intervention: { type: String, required: true },
});

const SleepIntervention = mongoose.model(
  "SleepIntervention",
  SleepInterventionSchema
);

module.exports = SleepIntervention;
