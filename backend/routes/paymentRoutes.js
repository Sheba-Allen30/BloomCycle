const express = require("express");
const router = express.Router();
const { createCheckoutSession, handleWebhook } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");



router.post("/create-checkout-session", authMiddleware, createCheckoutSession);

module.exports = router;
