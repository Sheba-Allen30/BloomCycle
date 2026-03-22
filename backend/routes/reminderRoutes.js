const express = require("mongoose");
const router = require("express").Router();
const { getReminders, createReminder, deleteReminder, toggleReminder } = require("../controllers/reminderController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getReminders);
router.post("/", authMiddleware, createReminder);
router.delete("/:id", authMiddleware, deleteReminder);
router.put("/:id/toggle", authMiddleware, toggleReminder);

module.exports = router;
