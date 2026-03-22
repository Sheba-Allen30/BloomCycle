const express = require("express");
const router = express.Router();

const { logSymptoms, getSymptoms } = require("../controllers/symptomController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, logSymptoms);
router.get("/", authMiddleware, getSymptoms);

module.exports = router;
