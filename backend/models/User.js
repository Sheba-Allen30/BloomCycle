const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6
    },

    dob: {
      type: Date,
      required: false,
    },
    
    height: {
      type: Number,
      required: false, // in cm
    },

    weight: {
      type: Number,
      required: false, // in kg
    },

    cycleLength: {
      type: Number,
      default: 28,
      min: 21,
      max: 40,
    },

    periodDuration: {
      type: Number,
      default: 5,
      min: 2,
      max: 10,
    },

    // Password Reset
    resetToken: {
      type: String,
    },

    resetTokenExpiry: {
      type: Date,
    },

    // Premium Access
    isPremium: {
      type: Boolean,
      default: false,
    },

    // Optional future feature
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
  },
  { timestamps: true }
);


// 🔐 HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});


// 🔑 METHOD TO COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);