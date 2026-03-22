const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, username, email, password, dob, height, weight } = req.body;

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is taken" });
    }

    // Create new user (password is automatically hashed by User model pre-save hook)
    const user = await User.create({
      name,
      username,
      email,
      password: password,
      dob,
      height,
      weight
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await require("bcryptjs").compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = require("jsonwebtoken").sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPremium: user.isPremium
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a simple numeric PIN for demonstration instead of full email approach
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Ideally, send email. Here we just return it to the frontend for simulation
    res.json({
      message: "Password reset token generated",
      simulatedToken: resetToken // In production, never return this in API response! 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetToken,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Set new password (saved hook will hash it)
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -resetToken -resetTokenExpiry");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, cycleLength, periodDuration } = req.body;

    // We do not allow password updates here for security reasons,
    // a separate password update endpoint should be used if needed.

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, cycleLength, periodDuration },
      { new: true, runValidators: true }
    ).select("-password -resetToken -resetTokenExpiry");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};