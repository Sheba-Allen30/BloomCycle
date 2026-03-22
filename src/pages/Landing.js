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
    <div className="landing animate-fade-in">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-text animate-slide-up delay-100">

            <img src={logo} alt="BloomCycle Logo" className="hero-logo" />

            <h1 className="brand-text">BloomCycle</h1>

            <p>
              Track your menstrual cycle, symptoms, and overall wellbeing
              with confidence using our beautifully secure platform.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="btn-primary hover-lift">
                Get Started
              </Link>
              <Link to="/features" className="btn-outline">
                View Features
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mock-card animate-slide-up delay-300">
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
            <div className="feature-card hover-lift animate-slide-up delay-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: "15px"}}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <h3>Smart Tracking</h3>
              <p>
                Log periods in seconds and view your entire cycle history in a beautifully designed calendar.
              </p>
            </div>

            <div className="feature-card hover-lift animate-slide-up delay-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: "15px"}}>
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <h3>Deep Insights</h3>
              <p>
                Get personal predictions and understand how your cycle affects your symptoms and moods over time.
              </p>
            </div>

            <div className="feature-card hover-lift animate-slide-up delay-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: "15px"}}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
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

          <Link to="/register" className="btn-primary hover-lift hover-pulse" style={{ padding: '16px 40px', fontSize: '1.2rem' }}>
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Landing;
