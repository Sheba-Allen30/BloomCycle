import { Link } from "react-router-dom";
import "../App.css";

function Landing() {
  return (
    <div className="landing">

      {/* HERO SECTION */}
      <section className="hero-layout">
        <div className="hero-text">
          <h1 className="brand-text">BloomCycle</h1>
          <p>
            Track your menstrual cycle, symptoms, and overall wellbeing
            with confidence using our secure web platform.
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
            <h3>Cycle Overview</h3>
            <p>Next period in</p>
            <h2>5 Days</h2>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-grid">
        <div className="feature-card">
          <span>📅</span>
          <h3>Smart Cycle Tracking</h3>
          <p>
            Log periods and get accurate predictions for upcoming cycles.
          </p>
        </div>

        <div className="feature-card">
          <span>📊</span>
          <h3>Personalized Insights</h3>
          <p>
            Understand your symptoms and cycle patterns over time.
          </p>
        </div>

        <div className="feature-card">
          <span>🔒</span>
          <h3>Secure & Private</h3>
          <p>
            Your health data is protected and stays confidential.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Take control of your cycle today</h2>
        <p>
          Join BloomCycle and experience smarter tracking with meaningful insights.
        </p>

        <Link to="/register" className="btn-primary">
          Create Free Account
        </Link>
      </section>
    </div>
  );
}

export default Landing;
