import React from "react";
import "../App.css";

export default function Insights() {
  const isPremium = localStorage.getItem("premium") === "true";

  return (
    <div className="page-section">
      <h1 className="dashboard-title">Insights</h1>

      {!isPremium ? (
        <div className="section-card" style={{ textAlign: "center" }}>
          <h2>🔒 Premium Feature</h2>
          <p>Upgrade to unlock advanced cycle insights.</p>
          <button
            className="btn-primary"
            onClick={() => {
              localStorage.setItem("premium", "true");
              window.location.reload();
            }}
          >
            Upgrade Now
          </button>
        </div>
      ) : (
        <div className="section-card">
          <h2>📈 Advanced Insights</h2>
          <p>• Average cycle length: 28 days</p>
          <p>• Most common symptom: Cramps</p>
          <p>• Best wellness days predicted</p>
        </div>
      )}
    </div>
  );
}
