const asyncHandler = require("express-async-handler");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");

const faceScanController = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const base64Image = req.file.buffer.toString("base64");
  // Spawn Python process
  const pythonProcess = spawn("python", [
    "D:\\Projects\\Freelancing\\Influence-of-Bedtime-Mobile-App-Backend\\MLModels\\emotionDetector\\emotionDetector.py",
  ]);

  pythonProcess.stdin.write(JSON.stringify({ image: base64Image }));
  pythonProcess.stdin.end();

  let result = "";
  let hadError = false;

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString);
    result = data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(` ${data}`);
    hadError = true;
  });

  pythonProcess.stdout.on("end", () => {
    // Delete the image file after processing to save space
    fs.unlinkSync(filePath);
    if (hadError) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    try {
      const responseData = JSON.parse(result);
      res.status(200).json(responseData);
    } catch (err) {
      res.status(500).json({ error: "Invalid response from Python script" });
    }
  });
});

module.exports = {
  faceScanController,
};
