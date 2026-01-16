import { Link } from "react-router-dom";
import "../App.css";

function Dashboard() {
  return (
    <div className="page-section dashboard">

      {/* HEADER */}
      <h1 className="page-title">
        Good Morning <span role="img" aria-label="wave">👋</span>
      </h1>
      <p className="page-subtitle">
        Track your cycle and stay informed about your health
      </p>

      {/* MAIN GRID */}
      <div className="dashboard-grid">

        {/* LEFT: CYCLE RING */}
        <div className="section-card center">
          <div
            className="cycle-ring"
            style={{ "--progress": "280deg" }}
          >
            <div className="cycle-inner">
              <p className="small-text">Next period in</p>
              <h2>5 Days</h2>
              <Link to="/log-period" className="link-primary">
                Log Period
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="section-card">
          <h3 className="card-title">Quick Actions</h3>

          <div className="action-list">
            <Link to="/calendar" className="action-card">
              📅 View Calendar
            </Link>

            <Link to="/symptoms" className="action-card">
              ❤️ Track Symptoms
            </Link>

            <Link to="/insights" className="action-card">
              📊 View Insights
            </Link>

            <Link to="/membership" className="action-card premium">
              ⭐ Upgrade to Premium
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
