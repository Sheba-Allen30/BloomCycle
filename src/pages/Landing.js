import { Link } from "react-router-dom";
import "./Landing.css";
import logo from "../assets/BLOOMCYCLE_LOGO.png";
import { useEffect } from "react";

function Landing() {
  // Simple scroll-to-top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="landing">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-text">

            <img src={logo} alt="BloomCycle Logo" className="hero-logo" />

            <h1 className="brand-text">BloomCycle</h1>

            <p>
              Track your menstrual cycle, symptoms, and overall wellbeing
              with confidence using our beautifully secure platform.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
              <Link to="/features" className="btn-outline">
                View Features
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mock-card">
              <h3>Track • Log • Understand</h3>
              <p>Your cycle, symptoms, and moods</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="container">
          <div className="features-header">
            <h2>Everything you need for your cycle</h2>
            <p>Understand your body better with simple, powerful tracking tools built for you.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <span>📅</span>
              <h3>Smart Tracking</h3>
              <p>
                Log periods in seconds and view your entire cycle history in a beautifully designed calendar.
              </p>
            </div>

            <div className="feature-card">
              <span>📊</span>
              <h3>Deep Insights</h3>
              <p>
                Get personal predictions and understand how your cycle affects your symptoms and moods over time.
              </p>
            </div>

            <div className="feature-card">
              <span>🔒</span>
              <h3>Private & Secure</h3>
              <p>
                Your health data belongs strictly to you. Enjoy peace of mind with our secure platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <h2>Take control of your cycle today</h2>
          <p>
            Join BloomCycle and experience smarter tracking combined with meaningful insights.
          </p>

          <Link to="/register" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.2rem' }}>
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
