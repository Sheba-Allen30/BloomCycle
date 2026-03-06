import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Tracking.css";

function LogPeriod() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [flow, setFlow] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || !flow) {
      alert("Please fill all required fields");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date");
      return;
    }

    try {
      setLoading(true);

      await API.post("/period", {
        startDate,
        endDate,
        flow,
        notes
      });

      setStartDate("");
      setEndDate("");
      setFlow("");
      setNotes("");

      alert("Period saved successfully!");
      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Error saving period");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracking-container">
      <div className="tracking-header">
        <h1 className="tracking-title">Log a Period</h1>
        <p className="tracking-subtitle">Keep your cycle history accurate by logging your dates and flow.</p>
      </div>

      <div className="tracking-card">
        <form onSubmit={handleSave}>

          <div className="date-row">
            <div className="form-section">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="tracking-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-section">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="tracking-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Flow Intensity</label>
            <div className="flow-selection">
              {["No Flow", "Spotting", "Light", "Medium", "Heavy"].map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => setFlow(f)}
                  className={`flow-btn ${flow === f ? "active-flow" : ""}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="tracking-input"
              placeholder="Any symptoms, mood changes, or specific notes for this cycle..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", marginTop: "10px", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Saving..." : "Save Period to History"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default LogPeriod;