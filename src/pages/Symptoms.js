import { useState } from "react";

function TrackSymptoms() {
  const symptomsList = [
    "Cramps",
    "Headache",
    "Back Pain",
    "Bloating",
    "Mood Swings",
    "Fatigue",
    "Nausea",
    "Acne",
  ];

  const [selected, setSelected] = useState([]);
  const [notes, setNotes] = useState("");

  const toggleSymptom = (symptom) => {
    setSelected((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div className="page-section">
      <div className="section-card symptoms-card">
        <h1 className="page-title">Track Symptoms</h1>
        <p className="page-subtitle">
          Select the symptoms you are experiencing today
        </p>

        <div className="symptoms-grid">
          {symptomsList.map((symptom) => (
            <button
              key={symptom}
              className={`symptom-chip ${
                selected.includes(symptom) ? "active" : ""
              }`}
              onClick={() => toggleSymptom(symptom)}
            >
              {symptom}
            </button>
          ))}
        </div>

        <div className="form-group">
          <label>Notes (optional)</label>
          <textarea
            placeholder="Any additional details or feelings..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button className="save-btn">Save Symptoms</button>
      </div>
    </div>
  );
}

export default TrackSymptoms;
