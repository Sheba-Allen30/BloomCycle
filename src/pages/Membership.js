import React from "react";

function Membership() {
  return (
    <div className="page-section">
      <h1 className="page-title">BloomCycle Membership</h1>
      <p className="page-subtitle">
        Unlock advanced cycle insights and predictions
      </p>

      <div className="membership-cards">
        {/* FREE PLAN */}
        <div className="membership-card">
          <h2>Free</h2>
          <ul>
            <li>✔ Period tracking</li>
            <li>✔ Symptom logging</li>
            <li>✔ Basic calendar</li>
            <li>✔ Next period prediction</li>
          </ul>

          <button className="free-btn" disabled>
            Current Plan
          </button>
        </div>

        {/* PREMIUM PLAN */}
        <div className="membership-card premium">
          <h2>
            Premium <span>✨</span>
          </h2>
          <ul>
            <li>✔ Everything in Free</li>
            <li>✔ 3-month predictions</li>
            <li>✔ Ovulation window</li>
            <li>✔ Advanced insights</li>
            <li>✔ Charts & trends</li>
          </ul>

          <button className="premium-btn">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Membership;
