const express = require("express");
const router = express.Router();

const { getCyclePrediction } = require("../controllers/predictionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/prediction", authMiddleware, getCyclePrediction);

module.exports = router;