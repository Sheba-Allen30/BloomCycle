import { Link } from "react-router-dom";

function Dashboard() {
  const membership = localStorage.getItem("membership") || "FREE";
  const cycleLength = 28;
  const periodDuration = 5;

  const lastPeriod = JSON.parse(localStorage.getItem("lastPeriod"));

  let nextStart = null;
  let daysRemaining = "--";

  if (lastPeriod?.startDate) {
    const last = new Date(lastPeriod.startDate);
    nextStart = new Date(last);
    nextStart.setDate(last.getDate() + cycleLength);

    const today = new Date();
    daysRemaining = Math.ceil((nextStart - today) / (1000 * 60 * 60 * 24));
  }

  const progress =
    daysRemaining !== "--"
      ? ((cycleLength - daysRemaining) / cycleLength) * 360
      : 0;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Good Morning 👋</h1>

      {membership === "PREMIUM" ? (
        <div className="premium-badge">🌟 Premium Member</div>
      ) : (
        <Link to="/membership" className="upgrade-banner">
          Upgrade to Premium for advanced insights →
        </Link>
      )}

      <div className="cycle-container">
        <div
          className="cycle-ring animate-ring"
          style={{ "--progress": `${progress}deg` }}
        >
          <div className="cycle-inner">
            <p className="small-text">Next period in</p>
            <h2>
              {daysRemaining === "--" ? "Log Period" : `${daysRemaining} Days`}
            </h2>
            <Link to="/log-period" className="ring-btn">Log Period</Link>
          </div>
        </div>

        <div className="cycle-actions">
          <Link to="/log-period" className="action-card">🩸 Track Period</Link>
          <Link to="/symptoms" className="action-card">❤️ Symptoms</Link>
          <Link to="/calendar" className="action-card">📅 Calendar</Link>
          <Link to="/insights" className="action-card">📊 Insights</Link>
        </div>
      </div>

      <div className="cycle-tabs">
        <button className="tab active">Period</button>
        <button className="tab">Ovulation</button>
        <button className="tab">Pregnancy</button>
      </div>
    </div>
  );
}

export default Dashboard;
