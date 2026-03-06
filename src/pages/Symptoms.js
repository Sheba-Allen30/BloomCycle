import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import "./Symptoms.css";
import "./Tracking.css";

function Symptoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchTodaySymptoms();
  }, []);

  const fetchTodaySymptoms = async () => {
    try {
      const res = await API.get("/symptoms");
      const todayString = new Date().toLocaleDateString();
      const todayLog = res.data.find(log => log.date === todayString);
      if (todayLog) {
        setSelectedSymptoms(todayLog.symptoms || []);
        setNotes(todayLog.notes || "");
      }
    } catch (error) {
      console.error("Failed to load symptoms", error);
    }
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = async () => {
    if (selectedSymptoms.length === 0 && notes.trim() === "") {
      toast.warning("Please select at least one symptom or add notes");
      return;
    }

    try {
      setLoading(true);
      await API.post("/symptoms", {
        date: new Date().toLocaleDateString(),
        symptoms: selectedSymptoms,
        notes: notes
      });
      toast.success("Symptoms saved successfully 🌸");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error saving symptoms");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracking-container">
      <div className="tracking-header">
        <h1 className="tracking-title">Track Symptoms</h1>
        <p className="tracking-subtitle">Select what you're feeling today to build better cycle insights.</p>
      </div>

      <div className="tracking-card">

        <div className="form-section">
          <label className="form-label">How are you feeling today?</label>
          <div className="symptom-tag-grid">
            {symptomsList.map((symptom) => (
              <button
                key={symptom}
                className={`symptom-tag-btn ${selectedSymptoms.includes(symptom) ? "active" : ""}`}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Personal Notes (optional)</label>
          <textarea
            className="tracking-input"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional details or feelings..."
          />
        </div>

        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={loading}
          style={{ width: "100%", marginTop: "10px", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Saving..." : "Save Daily Symptoms"}
        </button>

      </div>
    </div>
  );
}

export default Symptoms;
