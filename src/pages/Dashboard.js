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

  const getDietPlan = (day) => {
    if (day >= 1 && day <= 5) {
      return {
        phase: "Menstrual Phase",
        foods: "Iron-rich foods (spinach, lentils), warm soups, ginger tea.",
        avoid: "Caffeine, salty foods, cold drinks.",
        groceryList: ["Spinach", "Lentils", "Ginger Root", "Dark Chocolate", "Chamomile Tea", "Red Meat/Tofu"]
      };
    } else if (day >= 6 && day <= 14) {
      return {
        phase: "Follicular Phase",
        foods: "Light fresh foods, salads, lean proteins, fermented foods.",
        avoid: "Heavy carbs, processed foods.",
        groceryList: ["Mixed Greens", "Kombucha/Kimchi", "Chicken/Salmon", "Avocado", "Citrus Fruits", "Pumpkin Seeds"]
      };
    } else if (day >= 15 && day <= 18) {
      return {
        phase: "Ovulatory Phase",
        foods: "Antioxidant-rich berries, quinoa, leafy greens, nuts.",
        avoid: "Excessive dairy, refined sugars.",
        groceryList: ["Blueberries", "Quinoa", "Almonds", "Kale", "Bell Peppers", "Tomatoes"]
      };
    } else {
      return {
        phase: "Luteal Phase",
        foods: "Complex carbs (sweet potatoes), magnesium (dark chocolate), healthy fats.",
        avoid: "Alcohol, excessive caffeine.",
        groceryList: ["Sweet Potatoes", "Dark Chocolate (70%+)", "Walnuts", "Bananas", "Oats", "Turkey/Chickpeas"]
      };
    }
  };


  // Advanced Clue-Style Ring Calculation
  const daysInCycle = averageCycle || 28;
  const periodDuration = 5; // Default period duration
  const ovulationDay = Math.max(daysInCycle - 14, 1);
  const fertileStart = Math.max(ovulationDay - 4, 1);
  const fertileEnd = Math.min(ovulationDay + 1, daysInCycle);

  const radius = 115;
  const stroke = 16;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;

  const getSegmentStyles = (startDay, endDay) => {
    // Subtract 1 because day 1 starts at 0%
    const startPct = (startDay - 1) / daysInCycle;
    const endPct = endDay / daysInCycle;
    const segmentLength = (endPct - startPct) * circumference;
    return {
      strokeDasharray: `${segmentLength} ${circumference}`,
      strokeDashoffset: -(startPct * circumference)
    };
  };

  // Current Day Indicator Angle (SVG is rotated -90deg, so 0 is top)
  const currentDayAngle = ((cycleDay - 1) / daysInCycle) * 360;
  const currentDayRad = (currentDayAngle * Math.PI) / 180;
  const indicatorX = radius + normalizedRadius * Math.cos(currentDayRad);
  const indicatorY = radius + normalizedRadius * Math.sin(currentDayRad);

  // Inner Text Dates
  const todayDateStr = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
  const nextPeriodDateStr = nextPeriod ? new Date(nextPeriod).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : "--";

  const getDayCoordinates = (day) => {
    const angle = ((day - 1) / daysInCycle) * 360;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius + normalizedRadius * Math.cos(rad),
      y: radius + normalizedRadius * Math.sin(rad)
    };
  };

  const indicatorPos = getDayCoordinates(cycleDay);

  const healthTips = [
    "Stay hydrated! Drinking water helps reduce bloating.",
    "Gentle exercise like yoga can ease cramps.",
    "Get plenty of rest to support your body's natural rhythms.",
    "A balanced diet rich in iron can boost your energy levels.",
    "Track your mood daily to find helpful patterns."
  ];
  const dailyTip = healthTips[new Date().getDate() % healthTips.length];

  return (
    <div className="dashboard-container animate-fade-in">
      {/* HEADER */}
      <div className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 className="welcome-text">Hello, {userName}</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun" style={{opacity: 0.8}}>
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </div>
        <p className="welcome-subtext">Here is your cycle overview for today.</p>
      </div>

      <div className="dashboard-layout">

        {/* LEFT COLUMN: THE CYCLE RING */}
        <div className="dashboard-left">
          <div className="ring-card">
            <h3 className="card-title">Current Cycle</h3>

            <div className="ring-wrapper clue-ring-wrapper">
              <svg height={radius * 2} width={radius * 2} style={{ transform: "rotate(-90deg)", overflow: "visible", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.06))" }}>
                <defs>
                  {/* Drop Shadow Filter for active segments */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  
                  {/* Gradient for Fertile Window */}
                  <linearGradient id="fertileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>

                  {/* Gradient for Menstrual Phase */}
                  <linearGradient id="periodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>

                {/* Background Track - Subtle & Modern */}
                <circle
                  className="track-circle"
                  fill="transparent"
                  strokeWidth={stroke - 2}
                  stroke="#f8fafc"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />

                {/* Fertile Window Phase */}
                <circle
                  stroke="url(#fertileGrad)"
                  fill="transparent"
                  strokeWidth={stroke + 4}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  style={{ ...getSegmentStyles(fertileStart, fertileEnd), filter: "url(#glow)" }}
                  className="phase-circle"
                />

                {/* Menstrual Phase */}
                <circle
                  stroke="url(#periodGrad)"
                  fill="transparent"
                  strokeWidth={stroke + 4}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  style={{ ...getSegmentStyles(1, periodDuration), filter: "url(#glow)" }}
                  className="phase-circle"
                />

                {/* Draw Individual Dots inside the Menstrual Phase for premium detailing */}
                {Array.from({ length: periodDuration }).map((_, i) => {
                  const pos = getDayCoordinates(i + 1);
                  return (
                    <circle
                      key={`dot-${i}`}
                      cx={pos.x}
                      cy={pos.y}
                      r={2.5}
                      fill="#ffffff"
                      opacity="0.9"
                    />
                  );
                })}

                {/* Current Day Indicator Outline - Sleek and modern */}
                <circle
                  cx={indicatorPos.x}
                  cy={indicatorPos.y}
                  r={12}
                  fill="white"
                  stroke="#e2e8f0"
                  strokeWidth={1}
                  className="current-day-indicator"
                  style={{ transformOrigin: `${indicatorPos.x}px ${indicatorPos.y}px`, filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
                />
                {/* Current Day Indicator Inner Dot */}
                <circle
                  cx={indicatorPos.x}
                  cy={indicatorPos.y}
                  r={4.5}
                  fill="var(--primary)"
                  className="current-day-indicator-inner"
                  style={{ transformOrigin: `${indicatorPos.x}px ${indicatorPos.y}px` }}
                />
              </svg>

              <div className="ring-content clue-ring-content">
                <span className="clue-today-text">Today {todayDateStr}</span>
                <span className="clue-main-text">
                  Your next period is due <strong>{nextPeriodDateStr}</strong>
                </span>
                <span className="clue-sub-text">predicting {daysLeft !== null ? daysLeft : "--"} days</span>
              </div>
            </div>

            <div className="ring-footer" style={{ background: "linear-gradient(to right, #fff1f2, #fce7f3)", border: "1px solid #fbcfe8", boxShadow: "inset 0 2px 4px rgba(255,255,255,0.8)" }}>
              <p style={{ color: "var(--primary)", fontSize: "1.1rem" }}><strong>{daysLeft !== null ? daysLeft : "--"} Days</strong> until next period</p>
              <p style={{ color: "#881337", opacity: 0.8, fontSize: "0.9rem" }}>Next: {nextPeriod ? new Date(nextPeriod).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "--"}</p>
            </div>

            <div className="ring-actions">
              <Link to="/log-period" className="btn-primary-small shadow-hover">Log Period</Link>
              <Link to="/symptoms" className="btn-secondary-small shadow-hover">Track Symptoms</Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INSIGHTS & CALENDAR SNIPPET */}
        <div className="dashboard-right">

          <div className="health-tip-card hover-lift">
            <div className="tip-header">
              <span className="tip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </span>
              <h4>Daily Health Tip</h4>
            </div>
            <p className="tip-text">{dailyTip}</p>
          </div>

          <div className="diet-plan-card hover-lift" style={{ background: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginBottom: "25px", border: "1px solid #ffe4e6", transition: "transform 0.3s ease", animation: "slideUp 0.5s ease-out 0.15s both" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", gap: "10px" }}>
              <span style={{ color: "var(--primary)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </span>
              <h4 style={{ margin: 0, color: "var(--text-main)", fontSize: "1.2rem" }}>Targeted Diet: {getDietPlan(cycleDay).phase}</h4>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "8px" }}>
              <strong>Eat:</strong> {getDietPlan(cycleDay).foods}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
              <strong>Minimize:</strong> {getDietPlan(cycleDay).avoid}
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card hover-lift delay-100 animate-slide-up">
              <div className="stat-icon cycle-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div className="stat-info">
                <h4>Average Cycle</h4>
                <h2>{averageCycle || "--"} <span className="text-sm">Days</span></h2>
              </div>
            </div>
            <div className="stat-card hover-lift delay-200 animate-slide-up">
              <div className="stat-icon history-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div className="stat-info">
                <h4>Cycles Logged</h4>
                <h2>{periods.length}</h2>
              </div>
            </div>
          </div>

          {/* LINK TO DAILY INSIGHTS */}
          <div className="daily-insights-link-card hover-lift delay-300 animate-slide-up" style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", marginBottom: "25px", border: "1px solid #e879f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86198f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                <h4 style={{ margin: 0, color: "#86198f", fontSize: "1.1rem" }}>Daily Insights & AI</h4>
              </div>
              <p style={{ margin: 0, color: "#a21caf", fontSize: "0.9rem" }}>Explore your grocery list, productivity planner, and chat with AI!</p>
            </div>
            <Link to="/daily-insights" style={{ background: "#c026d3", color: "white", padding: "10px 20px", borderRadius: "50px", textDecoration: "none", fontWeight: "bold", fontSize: "0.9rem", flexShrink: 0 }} className="shadow-hover">
              Open &rarr;
            </Link>
          </div>

          <div className="history-card hover-lift delay-400 animate-slide-up">
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

          <div className="premium-upsell hover-lift delay-500 animate-slide-up">
            <div className="upsell-content">
              <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                Unlock Deep Insights 
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="var(--primary)" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </h3>
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