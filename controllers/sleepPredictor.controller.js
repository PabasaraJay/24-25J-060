const asyncHandler = require("express-async-handler");
const { spawn } = require("child_process");
const SleepTimeRecord = require("../models/sleepTimeRecordModal");

const sleepPredictor = asyncHandler(async (req, res) => {
  const userData = req.body;

  // Step 3: Spawn Python script
  const pythonProcess = spawn("python", [
    "D:\\Projects\\Freelancing\\Influence-of-Bedtime-Mobile-App-Backend\\MLModels\\sleepPredictor\\sleepPredictor.py",
  ]);

  // Send data to Python script
  pythonProcess.stdin.write(JSON.stringify(userData));
  pythonProcess.stdin.end();

  let result = "";

  // Step 4: Receive output from Python script
  pythonProcess.stdout.on("data", (data) => {
    result = data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    try {
      console.log(result);
      const prediction = JSON.parse(result);
      res.json(prediction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Invalid response from model" });
    }
  });
});

const addSleepRecord = asyncHandler(async (req, res) => {
  let { date, sleepDuration, dailyStepCount } = req.body;

  try {
    // Check if a record with the given date exists
    // date = date.split("T")[0];
    // const [year, month, day] = date.split("-");
    const formatteDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
    console.log(formatteDate);
    let record = await SleepTimeRecord.findOne({ date: formatteDate });

    if (record) {
      // Update the existing record
      record.sleepDuration = sleepDuration;
      record.dailyStepCount = dailyStepCount;
      await record.save();

      res
        .status(200)
        .json({ message: "Sleep record updated successfully", record });
    } else {
      // Create a new record
      record = new SleepTimeRecord({
        date: formatteDate,
        sleepDuration,
        dailyStepCount,
      });
      await record.save();

      res
        .status(201)
        .json({ message: "Sleep record added successfully", record });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add or update sleep record",
      message: error.message,
    });
  }
});

const getAllSleepRecords = asyncHandler(async (req, res) => {
  try {
    const records = await SleepTimeRecord.find({});
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve sleep records" });
  }
});

// Update a sleep record
const updateRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { date, sleepDuration, dailyStepCount } = req.body;
  console.log("Updating record...");
  console.log(date);
  try {
    const updatedRecord = await SleepTimeRecord.findByIdAndUpdate(
      id,
      { date, sleepDuration, dailyStepCount },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    res
      .status(200)
      .json({ message: "Record updated successfully", updatedRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update record" });
  }
});

// Delete a sleep record
const deleteRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await SleepTimeRecord.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete record" });
  }
});

module.exports = {
  sleepPredictor,
  addSleepRecord,
  getAllSleepRecords,
  updateRecord,
  deleteRecord,
};
