const Period = require("../models/Period");

// Add new period
exports.addPeriod = async (req, res) => {
  try {
    const { startDate, endDate, symptoms, mood, flow, notes } = req.body;

    const newPeriod = await Period.create({
      userId: req.user.id, // from JWT middleware
      startDate,
      endDate,
      symptoms,
      mood,
      flow,
      notes
    });

    res.status(201).json({
      message: "Period logged successfully",
      period: newPeriod
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get logged-in user's periods
exports.getMyPeriods = async (req, res) => {
  try {
    const periods = await Period.find({ userId: req.user.id })
      .sort({ startDate: -1 });

    res.json(periods);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Predict next period
exports.predictNextPeriod = async (req, res) => {
  try {
    const periods = await Period.find({ userId: req.user.id })
      .sort({ startDate: 1 });

    if (periods.length < 2) {
      return res.status(400).json({
        message: "Not enough data to predict"
      });
    }

    // Calculate cycle lengths
    let totalCycleLength = 0;
    let cycleCount = 0;

    for (let i = 1; i < periods.length; i++) {
      const prevDate = new Date(periods[i - 1].startDate);
      const currDate = new Date(periods[i].startDate);

      const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);

      totalCycleLength += diffDays;
      cycleCount++;
    }

    const averageCycle = Math.round(totalCycleLength / cycleCount);

    const lastPeriod = periods[periods.length - 1];
    const nextDate = new Date(lastPeriod.startDate);
    nextDate.setDate(nextDate.getDate() + averageCycle);

    res.json({
      averageCycleLength: averageCycle,
      predictedNextPeriod: nextDate
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get Insights
exports.getInsights = async (req, res) => {
  try {
    const periods = await Period.find({ userId: req.user.id })
      .sort({ startDate: 1 });

    if (periods.length === 0) {
      return res.status(400).json({ message: "No period data found" });
    }

    // ---- Calculate average cycle length ----
    let totalCycle = 0;
    let cycleCount = 0;

    for (let i = 1; i < periods.length; i++) {
      const prev = new Date(periods[i - 1].startDate);
      const curr = new Date(periods[i].startDate);

      const diff = (curr - prev) / (1000 * 60 * 60 * 24);
      totalCycle += diff;
      cycleCount++;
    }

    const avgCycle = cycleCount > 0 
      ? Math.round(totalCycle / cycleCount)
      : null;

    // ---- Calculate average period duration ----
    let totalDuration = 0;

    periods.forEach(p => {
      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      const duration = (end - start) / (1000 * 60 * 60 * 24) + 1;
      totalDuration += duration;
    });

    const avgDuration = Math.round(totalDuration / periods.length);

    // ---- Symptom frequency ----
    const symptomCount = {};

    periods.forEach(p => {
      p.symptoms.forEach(sym => {
        symptomCount[sym] = (symptomCount[sym] || 0) + 1;
      });
    });

    res.json({
      totalCycles: periods.length,
      averageCycleLength: avgCycle,
      averagePeriodDuration: avgDuration,
      symptomFrequency: symptomCount
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};