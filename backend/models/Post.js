const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            enum: ["Support", "Advice", "PCOS", "General", "Success Story"],
            default: "General",
        },
        likes: {
            type: Number,
            default: 0,
        },
        replies: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                text: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
