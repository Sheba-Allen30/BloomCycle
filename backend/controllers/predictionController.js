const Period = require("../models/Period");

const getCyclePrediction = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const periods = await Period.find({ userId }).sort({ startDate: 1 });

    if (periods.length < 2) {
      return res.json({
        message: "Log at least 2 periods to generate prediction",
      });
    }

    const cycleLengths = [];

    for (let i = 1; i < periods.length; i++) {
      const prev = new Date(periods[i - 1].startDate);
      const current = new Date(periods[i].startDate);

      const diff = (current - prev) / (1000 * 60 * 60 * 24);
      cycleLengths.push(diff);
    }

    const sum = cycleLengths.reduce((a, b) => a + b, 0);
    const averageCycle = Math.round(sum / cycleLengths.length);

    const lastStart = new Date(periods[periods.length - 1].startDate);
    const nextPeriod = new Date(lastStart);
    nextPeriod.setDate(lastStart.getDate() + averageCycle);

    res.json({ averageCycle, nextPeriod });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getCyclePrediction };