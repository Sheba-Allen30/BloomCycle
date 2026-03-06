import React from "react";
import { Link } from "react-router-dom";
import "./Premium.css";

export default function Features() {
  return (
    <div className="premium-container">
      <div className="premium-header">
        <h1 className="premium-title">Features & Pricing</h1>
        <p className="premium-subtitle">
          Compare our plans and find the perfect fit for your tracking needs.
        </p>
      </div>

      <div className="insights-dashboard" style={{ padding: "0", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
              <th style={{ padding: "20px 30px", fontWeight: "700", color: "var(--text-main)", fontSize: "1.1rem" }}>Feature</th>
              <th style={{ padding: "20px 30px", fontWeight: "700", color: "var(--text-main)", fontSize: "1.1rem" }}>Basic</th>
              <th style={{ padding: "20px 30px", fontWeight: "700", color: "var(--text-main)", fontSize: "1.1rem", backgroundColor: "#fff0f3", color: "var(--primary)" }}>Premium ✨</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Cycle & Period Tracking", free: true, premium: true },
              { name: "Symptom & Mood Logging", free: true, premium: true },
              { name: "Basic Calendar History", free: true, premium: true },
              { name: "Next Period Prediction", free: true, premium: true },
              { name: "3-Month Future Predictions", free: false, premium: true },
              { name: "Ovulation Window", free: false, premium: true },
              { name: "Advanced Analytics & Insights", free: false, premium: true },
              { name: "Symptom Trends over Time", free: false, premium: true },
              { name: "Priority Support", free: false, premium: true },
            ].map((row, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" }}>
                <td style={{ padding: "20px 30px", fontWeight: "500", color: "var(--text-main)" }}>{row.name}</td>
                <td style={{ padding: "20px 30px" }}>
                  {row.free ? <span style={{ color: "#10b981", fontWeight: "bold", fontSize: "1.2rem" }}>✓</span> : <span style={{ color: "#cbd5e1", fontWeight: "bold" }}>--</span>}
                </td>
                <td style={{ padding: "20px 30px", backgroundColor: "rgba(255, 240, 243, 0.3)" }}>
                  {row.premium ? <span style={{ color: "var(--primary)", fontWeight: "bold", fontSize: "1.2rem" }}>✓</span> : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link to="/membership" className="btn-primary" style={{ fontSize: "1.1rem", padding: "16px 40px" }}>
          View Memberships
        </Link>
      </div>

    </div>
  );
}
