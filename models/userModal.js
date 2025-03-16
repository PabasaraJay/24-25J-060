const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const HOST_API = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_API : process.env.DEV_API;
//create tour modal
const userSchema = mongoose.Schema(
  {
    fullName: { type: "String", required: true },
    email: { type: "String", required: true },
    age: { type: "String", required: true },
    occupation: { type: "String", required: false },
    gender: { type: "String", required: true },
    height: { type: "String", required: false },
    weight: { type: "String", required: false }, 
    password: { type: "String", required: false }, 
    survay_completed:{ type: Boolean, required: false, default:false }, 
    sleepingDisorder: { type: Boolean, required: false, default: false},
    sleepingDisorderNote: { type: "String", required: false, default:'' },
    physicalDisability: { type: Boolean, required: false, default:false },
    physicalDisabilityNote: { type: "String", required: false, default:'' },
    workEnvironmentImpact: { type: "String", required: false, default:'' },
    stressLevel: { type: "String", required: false, default:'Avarage' },
   
  },
  {
    timestapms: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  //compare user give password encrypted password
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Function to calculate derived fields
userSchema.methods.calculateDerivedFields = function () {
  // Calculate BMI
  const heightInMeters = parseFloat(this.height) / 100; // Convert height from cm to meters
  const weightInKg = parseFloat(this.weight);
  const bmi = weightInKg / (heightInMeters * heightInMeters);

  // Calculate BMI categories
  const isOverweight = bmi >= 25 ? 1 : 0;
  const isUnderweight = bmi < 18.5 ? 1 : 0;

  // Calculate work environment impact
  const isWorkEnvironmentNeutral = this.workEnvironmentImpact <= 5 ? 1 : 0;
  const isWorkEnvironmentPositive = this.workEnvironmentImpact > 5 ? 1 : 0;

  // Calculate gender
  const isMale = this.gender === "Male" ? 1 : 0;
  const isFemale = this.gender === "Female" ? 1 : 0;

  let stressLevelRating;
  switch (this.stressLevel) {
    case "Low":
      stressLevelRating = 3; // Low stress
      break;
    case "Average":
      stressLevelRating = 6; // Moderate stress
      break;
    case "High":
      stressLevelRating = 9; // High stress
      break;
    default:
      stressLevelRating = 5; // Default to moderate stress if not specified
  }

  // Return derived fields
  return {
    Work_Environment_Impact_Neutral: isWorkEnvironmentNeutral,
    Work_Environment_Impact_Positive: isWorkEnvironmentPositive,
    BMI_Category_Overweight: isOverweight,
    BMI_Category_Underweight: isUnderweight,
    Gender_Male: isMale,
    Gender_Female: isFemale,
    Stress_Level:stressLevelRating,
  };
};

userSchema.methods.calculateUsageFields = function () {
  const age = parseFloat(this.age);
  const occupation = this.occupation;

  let technologyUsage = 4; 
  let socialMediaUsage = 2.5; 
  let gamingHours = 1; 
  let sleepHours = 7; 
  let physicalActivityHours = 2;

  if (age < 18) {
    technologyUsage = 6; 
    socialMediaUsage = 4; 
    gamingHours = 2; 
    sleepHours = 9; 
    physicalActivityHours=4;
  } else if (age >= 18 && age <= 30) {
    technologyUsage = 5; 
    socialMediaUsage = 3; 
    gamingHours = 12; 
    sleepHours = 7; 
    physicalActivityHours=2;
  } else if (age > 30) {
    technologyUsage = 3; 
    socialMediaUsage = 2; 
    gamingHours = 0;
    sleepHours = 7;
    physicalActivityHours=1;
  }


  const screenTimeHours = technologyUsage + socialMediaUsage + gamingHours;

  return {
    Technology_Usage_Hours: technologyUsage,
    Social_Media_Usage_Hours: socialMediaUsage,
    Gaming_Hours: gamingHours,
    Screen_Time_Hours: screenTimeHours,
    Sleep_Hours: sleepHours,
    Physical_Activity_Hours:physicalActivityHours,
  };
};


const User = mongoose.model("User", userSchema);

module.exports = User;