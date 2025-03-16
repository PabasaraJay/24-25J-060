const asyncHandler = require("express-async-handler");
const SleepIntervention = require("../models/sleepInterventionRecord");

const sleepInterventionController = {
  save: asyncHandler(async (req, res) => {
    const { userId, dateAndTime, emotion, stress_level, intervention } =
      req.body;

    const newRecord = new SleepIntervention({
      userId,
      dateAndTime,
      emotion,
      stress_level,
      intervention,
    });

    try {
      const savedRecord = await newRecord.save();
      res.status(201).json(savedRecord);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }),

  findByUserId: asyncHandler(async (req, res) => {
    const { userId } = req.body;

    try {
      const records = await SleepIntervention.find({ userId });
      res.status(200).json(records);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }),
};

module.exports = sleepInterventionController;
