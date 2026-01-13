import { useState, useEffect } from "react";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodData, setPeriodData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastPeriod");
    if (saved) {
      setPeriodData(JSON.parse(saved));
    }
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isPeriodDay = (day) => {
    if (!periodData) return false;

    const start = new Date(periodData.startDate);
    const end = new Date(periodData.endDate);
    const current = new Date(year, month, day);

    return current >= start && current <= end;
  };

  return (
    <div className="calendar-page">
      <h1>Cycle History</h1>
      <p className="subtitle">View your past period records</p>

      <div className="calendar-card">
        {/* HEADER */}
        <div className="calendar-header">
          <button onClick={prevMonth}>‹</button>
          <h2>
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={nextMonth}>›</button>
        </div>

        {/* WEEKDAYS */}
        <div className="calendar-grid weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>

        {/* DAYS */}
        <div className="calendar-grid">
          {Array(firstDay)
            .fill(null)
            .map((_, i) => (
              <div key={`empty-${i}`} className="empty"></div>
            ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
            (day) => (
              <div
                key={day}
                className={
                  isPeriodDay(day)
                    ? "calendar-day period-day"
                    : "calendar-day"
                }
              >
                {day}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
