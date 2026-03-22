const Reminder = require("../models/Reminder");

exports.getReminders = async (req, res) => {
    try {
        const reminders = await Reminder.find({ userId: req.user.id });
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.createReminder = async (req, res) => {
    try {
        const { title, activePhases, time, isActive } = req.body;
        const newReminder = new Reminder({
            userId: req.user.id,
            title,
            activePhases,
            time,
            isActive
        });

        await newReminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteReminder = async (req, res) => {
    try {
        await Reminder.findByIdAndDelete(req.params.id);
        res.json({ message: "Reminder deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.toggleReminder = async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);
        if (!reminder) return res.status(404).json({ error: "Reminder not found" });

        reminder.isActive = !reminder.isActive;
        await reminder.save();

        res.json(reminder);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
