import { useState } from "react";

function LogPeriod() {
  const [flow, setFlow] = useState("Medium");

  return (
    <div className="page-section">
      <h1 className="page-title">Log Period</h1>
      <p className="page-subtitle">
        Track your menstrual cycle accurately
      </p>

      <div className="section-card log-card">
        {/* DATE ROW */}
        <div className="form-row">
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input type="date" />
          </div>
        </div>

        {/* FLOW */}
        <div className="form-group">
          <label>Flow Intensity</label>
          <div className="flow-options">
            {["No Flow", "Spotting", "Light", "Medium", "Heavy"].map((item) => (
              <button
                key={item}
                type="button"
                className={`flow-btn ${flow === item ? "active" : ""}`}
                onClick={() => setFlow(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* NOTES */}
        <div className="form-group">
          <label>Notes (optional)</label>
          <textarea placeholder="Any symptoms or notes..." />
        </div>

        {/* SAVE */}
        <button className="save-btn">Save Period</button>
      </div>
    </div>
  );
}

export default LogPeriod;
