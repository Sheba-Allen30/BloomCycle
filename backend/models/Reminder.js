const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    activePhases: {
        type: [String], // Array of phases: "Menstrual Phase", "Follicular Phase", "Ovulatory Phase", "Luteal Phase"
        required: true,
    },
    time: {
        type: String, // HH:MM format
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Reminder", reminderSchema);
