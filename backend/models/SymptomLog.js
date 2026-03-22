const mongoose = require("mongoose");

const symptomLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        symptoms: {
            type: [String],
            default: [],
        },
        notes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("SymptomLog", symptomLogSchema);
