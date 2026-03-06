import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [averageCycle, setAverageCycle] = useState(0);
  const [nextPeriod, setNextPeriod] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [daysLeft, setDaysLeft] = useState(null);
  const [cycleDay, setCycleDay] = useState(1);
  const [userName, setUserName] = useState("Beautiful");

  useEffect(() => {
    fetchPrediction();
    fetchPeriods();

    // Check if user info is casually stored or fetch it
    const storedName = localStorage.getItem("userName") || sessionStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const fetchPrediction = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/prediction",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAverageCycle(res.data.averageCycle);
      setNextPeriod(res.data.nextPeriod);

      // Calculate countdown and current day in cycle
      if (res.data.nextPeriod) {
        const today = new Date();
        const next = new Date(res.data.nextPeriod);

        // Ensure time doesn't mess up day calculations
        today.setHours(0, 0, 0, 0);
        next.setHours(0, 0, 0, 0);

        const diff = Math.ceil((next - today) / (1000 * 60 * 60 * 24));
        setDaysLeft(diff > 0 ? diff : 0);

        // Estimate current cycle day based on average cycle minus days left
        let calculatedCycleDay = res.data.averageCycle - diff;
        if (calculatedCycleDay < 1) calculatedCycleDay = 1;
        setCycleDay(calculatedCycleDay);
      }

    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const fetchPeriods = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/period",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPeriods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Ring Calculation
  const radius = 110;
  const stroke = 16;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Progress is how far along the cycle we are
  const progressPercent = averageCycle ? Math.min((cycleDay / averageCycle) * 100, 100) : 0;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const healthTips = [
    "Stay hydrated! Drinking water helps reduce bloating.",
    "Gentle exercise like yoga can ease cramps.",
    "Get plenty of rest to support your body's natural rhythms.",
    "A balanced diet rich in iron can boost your energy levels.",
    "Track your mood daily to find helpful patterns."
  ];
  const dailyTip = healthTips[new Date().getDate() % healthTips.length];

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="welcome-text">Hello, {userName} 🌸</h1>
        <p className="welcome-subtext">Here is your cycle overview for today.</p>
      </div>

      <div className="dashboard-layout">

        {/* LEFT COLUMN: THE CYCLE RING */}
        <div className="dashboard-left">
          <div className="ring-card">
            <h3 className="card-title">Current Cycle</h3>

            <div className="ring-wrapper">
              <svg height={radius * 2} width={radius * 2}>
                <circle
                  stroke="#ffe4e6" // Light rose background
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="#e11d48" // Vibrant rose progress
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="progress-ring-circle"
                />
              </svg>
              <div className="ring-content">
                <span className="ring-day-number">Day {cycleDay}</span>
                <span className="ring-subtitle">of your cycle</span>
              </div>
            </div>

            <div className="ring-footer">
              <p><strong>{daysLeft !== null ? daysLeft : "--"} Days</strong> until next period</p>
              <p>Next: {nextPeriod ? new Date(nextPeriod).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "--"}</p>
            </div>

            <div className="ring-actions">
              <Link to="/log-period" className="btn-primary-small shadow-hover">Log Period</Link>
              <Link to="/symptoms" className="btn-secondary-small shadow-hover">Track Symptoms</Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INSIGHTS & CALENDAR SNIPPET */}
        <div className="dashboard-right">

          <div className="health-tip-card">
            <div className="tip-header">
              <span className="tip-icon">💡</span>
              <h4>Daily Health Tip</h4>
            </div>
            <p className="tip-text">{dailyTip}</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon cycle-icon">⏳</div>
              <div className="stat-info">
                <h4>Average Cycle</h4>
                <h2>{averageCycle || "--"} <span className="text-sm">Days</span></h2>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon history-icon">📋</div>
              <div className="stat-info">
                <h4>Cycles Logged</h4>
                <h2>{periods.length}</h2>
              </div>
            </div>
          </div>

          <div className="history-card">
            <div className="history-card-header">
              <h3 className="card-title">Recent Logs</h3>
              <Link to="/calendar" className="view-all-link">View Calendar &rarr;</Link>
            </div>

            {periods.length === 0 ? (
              <div className="empty-state">
                <p>You haven't logged any periods yet.</p>
                <Link to="/log-period" className="text-rose-600 font-semibold mt-2 inline-block">Start Tracking</Link>
              </div>
            ) : (
              <ul className="mini-history-list">
                {periods.slice(0, 3).map((period, index) => (
                  <li key={index} className="mini-history-item">
                    <div className="date-badge">
                      <span className="month">{new Date(period.startDate).toLocaleString('default', { month: 'short' })}</span>
                      <span className="day">{new Date(period.startDate).getDate()}</span>
                    </div>
                    <div className="history-details">
                      <p><strong>Period</strong> logged</p>
                      <span className="duration-text">
                        {Math.ceil((new Date(period.endDate) - new Date(period.startDate)) / (1000 * 60 * 60 * 24)) + 1} Days
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="premium-upsell">
            <div className="upsell-content">
              <h3>Unlock Deep Insights ✨</h3>
              <p>Get AI predictions, ovulation tracking, and symptom analysis with Premium.</p>
            </div>
            <Link to="/membership" className="upsell-btn">Upgrade</Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;