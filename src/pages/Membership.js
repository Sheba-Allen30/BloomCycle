import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import "./Premium.css";

function Membership() {
  const isPremium = (localStorage.getItem("isPremium") || sessionStorage.getItem("isPremium")) === "true";
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (isPremium) {
      toast.info("You already have Premium access.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/payment/create-checkout-session");
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-container">
      <div className="premium-header">
        <h1 className="premium-title">BloomCycle Memberships</h1>
        <p className="premium-subtitle">
          Whether you want simple tracking or deep health insights, choose the plan that fits your body.
        </p>
      </div>

      <div className="membership-grid">

        {/* FREE PLAN */}
        <div className="plan-card">
          <h2 className="plan-name">Basic</h2>
          <div className="plan-price">$0<span>/forever</span></div>

          <ul className="plan-features">
            <li><span className="check-icon">✓</span> Period tracking & predictions</li>
            <li><span className="check-icon">✓</span> Daily symptom logging</li>
            <li><span className="check-icon">✓</span> Basic calendar history</li>
            <li><span className="check-icon">✓</span> Secure data storage</li>
          </ul>

          <button className="btn-outline" disabled style={{ opacity: 0.5, cursor: "default" }}>
            Current Plan
          </button>
        </div>

        {/* PREMIUM PLAN */}
        <div className="plan-card premium-tier">
          <div className="plan-badge">Most Popular</div>
          <h2 className="plan-name">Premium ✨</h2>
          <div className="plan-price">$9.99<span>/month</span></div>

          <ul className="plan-features">
            <li><span className="check-icon">✓</span> <strong>Everything in Basic</strong></li>
            <li><span className="check-icon">✓</span> 3-month cycle predictions</li>
            <li><span className="check-icon">✓</span> Advanced symptom analysis</li>
            <li><span className="check-icon">✓</span> Trend reporting & averages</li>
            <li><span className="check-icon">✓</span> Priority support</li>
          </ul>

          <button
            className="btn-primary"
            onClick={handleUpgrade}
            disabled={isPremium || loading}
          >
            {loading ? "Processing..." : isPremium ? "Active Subscription" : "Upgrade to Premium"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Membership;
