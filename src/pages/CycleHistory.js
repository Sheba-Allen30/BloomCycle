import React from "react";
import "../App.css";

export default function CycleHistory() {
  const periods = JSON.parse(localStorage.getItem("periods")) || [];

  return (
    <div className="page-section">
      <h1 className="dashboard-title">Cycle History</h1>
      <p className="dashboard-subtitle">Your logged periods</p>

      <div className="section-card">
        {periods.length === 0 ? (
          <p>No data available</p>
        ) : (
          <table className="features-table">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Flow</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((p, i) => (
                <tr key={i}>
                  <td>{p.startDate}</td>
                  <td>{p.endDate}</td>
                  <td>{p.flow}</td>
                  <td>{p.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
