import React, { useState, useEffect } from "react";
import API from "../api/axios";
import "./Tracking.css";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Calendar() {
  const [date, setDate] = useState(new Date());
  const [periods, setPeriods] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [periodsRes, symptomsRes] = await Promise.all([
        API.get("/period"),
        API.get("/symptoms")
      ]);
      setPeriods(periodsRes.data);
      setSymptoms(symptomsRes.data);
    } catch (error) {
      console.error("Failed to fetch calendar data", error);
    }
  };

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const changeMonth = (dir) => {
    setDate(new Date(year, month + dir, 1));
  };

  const isPeriodDay = (day) => {
    const currentDayDate = new Date(year, month, day);
    currentDayDate.setHours(0, 0, 0, 0);

    return periods.some(p => {
      const pStart = new Date(p.startDate);
      pStart.setHours(0, 0, 0, 0);
      const pEnd = new Date(p.endDate);
      pEnd.setHours(0, 0, 0, 0);

      return currentDayDate >= pStart && currentDayDate <= pEnd;
    });
  };

  const dayHasSymptoms = (day) => {
    const currentDayStr = new Date(year, month, day).toLocaleDateString();
    return symptoms.some(s => s.date === currentDayStr && s.symptoms.length > 0);
  };

  return (
    <div className="tracking-container">
      <div className="tracking-header">
        <h1 className="tracking-title">Cycle Calendar</h1>
        <p className="tracking-subtitle">View your past period records and logged symptoms</p>
      </div>

      <div className="tracking-card">
        <div className="calendar-header-nav">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <h2>{monthNames[month]} {year}</h2>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>

        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} className="weekday">{d}</div>
          ))}

          {Array(firstDay).fill("").map((_, i) => (
            <div key={"e" + i} className="calendar-day empty"></div>
          ))}

          {Array.from({ length: totalDays }, (_, i) => {
            const dayNum = i + 1;
            const isPd = isPeriodDay(dayNum);
            const hasSymp = dayHasSymptoms(dayNum);

            return (
              <div
                key={i}
                className={`calendar-day ${isPd ? "period-day" : ""}`}
                title={hasSymp ? "Symptoms logged" : ""}
              >
                <span>{dayNum}</span>
                {hasSymp && <div className="symptom-dot"></div>}
              </div>
            );
          })}
        </div>

        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color-box"></div>
            <span>Period Tracker</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot"></div>
            <span>Symptoms Logged</span>
          </div>
        </div>
      </div>
    </div>
  );
}
