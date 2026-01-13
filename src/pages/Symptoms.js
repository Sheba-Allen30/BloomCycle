import { useState } from "react";

function Symptoms() {
  const [selected, setSelected] = useState([]);
  const [notes, setNotes] = useState("");

  const symptoms = [
    "Cramps",
    "Headache",
    "Back Pain",
    "Bloating",
    "Acne",
    "Fatigue",
    "Mood Swings",
    "Anxiety",
    "Nausea",
  ];

  const toggleSymptom = (symptom) => {
    if (selected.includes(symptom)) {
      setSelected(selected.filter((s) => s !== symptom));
    } else {
      setSelected([...selected, symptom]);
    }
  };

  const handleSave = () => {
    const data = {
      symptoms: selected,
      notes,
      date: new Date().toLocaleDateString(),
    };

    localStorage.setItem("symptoms", JSON.stringify(data));
    alert("Symptoms saved successfully!");
  };

  return (
    <div className="symptoms-page">
      <h1>Track Symptoms</h1>
      <p className="subtitle">Select how you’re feeling today</p>

      <div className="symptoms-card">
        <label>Symptoms</label>

        <div className="symptom-grid">
          {symptoms.map((symptom) => (
            <button
              key={symptom}
              className={
                selected.includes(symptom)
                  ? "symptom-btn active"
                  : "symptom-btn"
              }
              onClick={() => toggleSymptom(symptom)}
            >
              {symptom}
            </button>
          ))}
        </div>

        <label>Notes (optional)</label>
        <textarea
          placeholder="Add any additional notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button className="save-btn" onClick={handleSave}>
          Save Symptoms
        </button>
      </div>
    </div>
  );
}

export default Symptoms;
