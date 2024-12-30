const express = require("express");
const sleepInterventionController = require("../controllers/sleppIntervention.controller");
const router = express.Router();

router.post("/save", sleepInterventionController.save);
router.post("/findByUserId", sleepInterventionController.findByUserId);

module.exports = router;
