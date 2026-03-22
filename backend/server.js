const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const predictionRoutes = require("./routes/predictionRoutes");
const authRoutes = require("./routes/authRoutes");
const periodRoutes = require("./routes/periodRoutes");
const symptomRoutes = require("./routes/symptomRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const communityRoutes = require("./routes/communityRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const aiRoutes = require("./routes/aiRoutes");

require("dotenv").config();

const app = express();

app.use(cors());

// Stripe Webhook needs raw body, must be before express.json()
const { handleWebhook } = require("./controllers/paymentController");
app.post("/api/payment/webhook", express.raw({ type: "application/json" }), handleWebhook);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/period", periodRoutes);
app.use("/api", predictionRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/ai", aiRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));