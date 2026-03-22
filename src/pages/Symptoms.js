import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import { FiDroplet, FiCloudDrizzle, FiMoon, FiSun, FiActivity, FiSmile, FiFrown, FiMeh, FiZap, FiZapOff, FiShield, FiShieldOff, FiHeart } from "react-icons/fi";
import { AiOutlineBgColors } from "react-icons/ai";
import { FaBed, FaHotjar } from "react-icons/fa";
import "./Symptoms.css";
import "./Tracking.css";

function Symptoms() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Clue-inspired categories with SVG Icons
  const categories = {
    Bleeding: [
      { label: "Light", icon: <FiDroplet />, color: "red" },
      { label: "Medium", icon: <FiDroplet style={{ strokeWidth: 3 }} />, color: "red" },
      { label: "Heavy", icon: <AiOutlineBgColors />, color: "red" },
      { label: "Spotting", icon: <FiCloudDrizzle />, color: "brown" }
    ],
    Pain: [
      { label: "Cramps", icon: <FaHotjar />, color: "blue" },
      { label: "Headache", icon: <FiActivity />, color: "blue" },
      { label: "Ovulation", icon: <FiZap />, color: "blue" },
      { label: "Tender Breasts", icon: <FiHeart />, color: "blue" }
    ],
    Mood: [
      { label: "Happy", icon: <FiSmile />, color: "orange" },
      { label: "Sensitive", icon: <FiFrown />, color: "orange" },
      { label: "Sad", icon: <FiFrown />, color: "orange" },
      { label: "PMS", icon: <FiMeh />, color: "orange" }
    ],
    Energy: [
      { label: "High Energy", icon: <FiSun />, color: "green" },
      { label: "Low Energy", icon: <FiMoon />, color: "green" },
      { label: "Exhausted", icon: <FaBed />, color: "green" }
    ],
    "Sex & Libido": [
      { label: "Protected", icon: <FiShield />, color: "teal" },
      { label: "Unprotected", icon: <FiShieldOff />, color: "teal" },
      { label: "High Libido", icon: <FiActivity />, color: "teal" }
    ]
  };

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

        {Object.entries(categories).map(([category, items]) => (
          <div className="form-section category-section" key={category}>
            <label className="form-label category-title">{category}</label>
            <div className="symptom-icon-grid">
              {items.map((item) => {
                const isSelected = selectedSymptoms.includes(item.label);
                return (
                  <button
                    key={item.label}
                    className={`symptom-icon-btn color-${item.color} ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleSymptom(item.label)}
                  >
                    <div className="icon-wrapper">
                      {item.icon}
                    </div>
                    <span className="icon-label">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

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
