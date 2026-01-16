import React, { useState } from "react";
import "../App.css";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export default function Calendar() {
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const changeMonth = (dir) => {
    setDate(new Date(year, month + dir, 1));
  };

  return (
    <div className="page-section">
      <h1 className="dashboard-title">Cycle History</h1>
      <p className="dashboard-subtitle">View your past period records</p>

      <div className="section-card" style={{ maxWidth: "700px" }}>
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <h2>{monthNames[month]} {year}</h2>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>

        <div className="calendar-grid">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="weekday">{d}</div>
          ))}

          {Array(firstDay).fill("").map((_, i) => (
            <div key={"e"+i} className="calendar-day empty"></div>
          ))}

          {Array.from({ length: totalDays }, (_, i) => (
            <div key={i} className="calendar-day">{i + 1}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
