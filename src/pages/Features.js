import React from "react";
import { Link } from "react-router-dom";
import "./Features.css";

export default function Features() {
  const plans = [
    { name: "Cycle & Period Tracking", free: true, premium: true },
    { name: "Symptom & Mood Logging", free: true, premium: true },
    { name: "Basic Calendar History", free: true, premium: true },
    { name: "Next Period Prediction", free: true, premium: true },
    { name: "3-Month Future Predictions", free: false, premium: true },
    { name: "Ovulation Window", free: false, premium: true },
    { name: "Phase-Specific Health Insights", free: false, premium: true },
    { name: "Symptom Trends over Time", free: false, premium: true },
    { name: "Priority Support", free: false, premium: true },
  ];

  return (
    <div className="features-container animate-fade-in">
      <div className="features-header animate-slide-up delay-100">
        <h1>Features & Pricing</h1>
        <p>Compare our plans and find the perfect fit for your tracking needs.</p>
      </div>

      <div className="features-table-wrapper animate-slide-up delay-200">
        <table className="features-table hover-lift">
          <thead>
            <tr>
              <th className="feature-col">Feature</th>
              <th className="plan-col basic">Basic</th>
              <th className="plan-col premium">
                <span className="premium-badge">Premium ✨</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {plans.map((row, index) => (
              <tr key={index} className="feature-row">
                <td className="feature-name">{row.name}</td>
                <td className="feature-check basic-check">
                  {row.free ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : (
                    <span className="feature-dash"></span>
                  )}
                </td>
                <td className="feature-check premium-check">
                  {row.premium && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="features-cta-wrapper animate-slide-up delay-300">
        <Link to="/membership" className="btn-primary features-cta-btn hover-pulse">
          View Memberships
        </Link>
      </div>
    </div>
  );
}
