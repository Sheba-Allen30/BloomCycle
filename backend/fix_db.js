const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

async function fixAccounts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        // Delete all users to ensure a completely fresh start since this is dev
        const result = await User.deleteMany({});
        console.log(`Deleted ${result.deletedCount} users.`);

        mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

fixAccounts();
