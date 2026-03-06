import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Premium.css";

export default function Insights() {
  const navigate = useNavigate();
  const isPremium = (localStorage.getItem("isPremium") || sessionStorage.getItem("isPremium")) === "true";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isPremium) {
      fetchInsights();
    }
  }, [isPremium]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const res = await API.get("/period/insights");
      setData(res.data);
    } catch (error) {
      console.error("Failed to load insights", error);
      if (error.response?.status === 400) {
        toast.info("Log more periods to generate insights.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = () => {
    navigate("/membership");
  };

  return (
    <div className="premium-container">
      <div className="premium-header">
        <h1 className="premium-title">Health Insights</h1>
        <p className="premium-subtitle">Unlock advanced analytics based on your unique cycle data.</p>
      </div>

      {!isPremium ? (
        <div className="insights-lock">
          <div className="lock-icon">🔒</div>
          <h2 style={{ fontSize: "2rem", color: "var(--text-main)", marginBottom: "15px" }}>Premium Feature</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "30px", fontSize: "1.1rem" }}>
            Upgrade to BloomCycle Premium to unlock deeply personalized cycle analytics, symptom trends, and overall health reports.
          </p>
          <button className="btn-primary" onClick={handleUpgrade} style={{ padding: "14px 40px" }}>
            View Plans
          </button>
        </div>
      ) : (
        <div className="insights-dashboard">

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Loading your personal insights...</div>
          ) : !data ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
                Not enough cycle data to generate insights yet. Keep logging your periods!
              </p>
            </div>
          ) : (
            <>
              <div className="insights-grid">
                <div className="insight-metric">
                  <h4>Total Cycles</h4>
                  <h2>{data.totalCycles}</h2>
                </div>
                <div className="insight-metric">
                  <h4>Avg Cycle Length</h4>
                  <h2>{data.averageCycleLength ? `${data.averageCycleLength} Days` : '--'}</h2>
                </div>
                <div className="insight-metric">
                  <h4>Avg Period Duration</h4>
                  <h2>{data.averagePeriodDuration ? `${data.averagePeriodDuration} Days` : '--'}</h2>
                </div>
              </div>

              <div className="symptom-trends">
                <h3>Most Common Symptoms</h3>
                {Object.keys(data.symptomFrequency || {}).length === 0 ? (
                  <p style={{ color: "var(--text-muted)" }}>No symptoms logged yet. Start tracking daily to see patterns.</p>
                ) : (
                  <ul className="symptom-list">
                    {Object.entries(data.symptomFrequency)
                      .sort((a, b) => b[1] - a[1]) // Sort descending
                      .map(([sym, count]) => (
                        <li key={sym}>
                          {sym}
                          <span className="symptom-count">{count} times</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}
