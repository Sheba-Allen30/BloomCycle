import { useState } from "react";

function LogPeriod() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [flow, setFlow] = useState("Medium");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    const periodData = {
      startDate,
      endDate,
      flow,
      notes,
    };

    // Frontend-only save (for demo)
    localStorage.setItem("lastPeriod", JSON.stringify(periodData));
    alert("Period details saved!");
  };

  return (
    <div className="log-period">
      <h1>Log Period</h1>
      <p className="subtitle">Track your menstrual cycle accurately</p>

      <div className="log-card">
        {/* DATE PICKERS */}
        <div className="date-row">
          <div>
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* FLOW INTENSITY */}
        <label>Flow Intensity</label>
        <div className="flow-options">
          {["No Flow", "Spotting", "Light", "Medium", "Heavy"].map((level) => (
            <button
              key={level}
              className={flow === level ? "flow-btn active" : "flow-btn"}
              onClick={() => setFlow(level)}
            >
              {level}
            </button>
          ))}
        </div>

        {/* NOTES */}
        <label>Notes (optional)</label>
        <textarea
          placeholder="Any symptoms or notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* SAVE */}
        <button className="save-btn" onClick={handleSave}>
          Save Period
        </button>
      </div>
    </div>
  );
}

export default LogPeriod;
