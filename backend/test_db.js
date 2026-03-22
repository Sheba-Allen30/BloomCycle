const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const fs = require("fs");
require("dotenv").config();

async function checkDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({});
        let out = "";
        for (const u of users) {
            out += `Email: ${u.email}\n`;
            out += `Password length in DB: ${u.password ? u.password.length : 0}\n`;
            out += `Password DB string: ${u.password}\n`;
            const isMatch = await bcrypt.compare("Smith18**", u.password || "");
            out += `Matches Smith18**: ${isMatch}\n\n`;
        }
        fs.writeFileSync("db_diagnostics.txt", out, "utf8");
        mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkDB();
