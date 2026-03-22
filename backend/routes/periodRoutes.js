const express = require("express");
const router = express.Router();
const { addPeriod, getMyPeriods } = require("../controllers/periodController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addPeriod);
router.get("/", authMiddleware, getMyPeriods);

module.exports = router;
const { predictNextPeriod } = require("../controllers/periodController");

router.get("/predict", authMiddleware, predictNextPeriod);
const { getInsights } = require("../controllers/periodController");

router.get("/insights", authMiddleware, getInsights);