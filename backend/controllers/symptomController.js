const SymptomLog = require("../models/SymptomLog");

exports.logSymptoms = async (req, res) => {
    try {
        const { date, symptoms, notes } = req.body;

        // Optional: check if a log already exists for exactly this date and userId
        let existingLog = await SymptomLog.findOne({
            userId: req.user.id,
            date: date
        });

        if (existingLog) {
            // Update existing
            existingLog.symptoms = symptoms;
            existingLog.notes = notes;
            await existingLog.save();
            return res.status(200).json({ message: "Symptoms updated successfully", log: existingLog });
        }

        const newLog = await SymptomLog.create({
            userId: req.user.id,
            date,
            symptoms,
            notes
        });

        res.status(201).json({
            message: "Symptoms logged successfully",
            log: newLog
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSymptoms = async (req, res) => {
    try {
        const logs = await SymptomLog.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
