import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container animate-fade-in">
      <div className="about-hero animate-slide-up delay-100">
        <h1>Transforming Women's Health</h1>
        <p>
          BloomCycle is more than a tracker. It’s a beautifully designed, deeply personalized 
          platform built to help you understand your body and regain control over your cycle.
        </p>
      </div>

      <section className="about-mission-section animate-slide-up delay-200">
        <div className="about-mission-image">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Women stretching naturally" 
          />
        </div>
        <div className="about-mission-text">
          <h2>Our Mission</h2>
          <p>
            For too long, individuals have faced difficulties in accurately tracking their
            menstrual cycles and identifying patterns related to their mental and physical wellbeing. 
            Existing solutions are often overly medical, clunky, or lack privacy.
          </p>
          <p>
            BloomCycle was created to solve this. We aim to provide a simple, user-friendly, 
            and breathtakingly secure web platform for cycle tracking, predictive health analytics, 
            and mood awareness.
          </p>
        </div>
      </section>

      <div className="about-grid animate-slide-up delay-300">
        <div className="about-value-card hover-lift">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <h3>Empathetic Design</h3>
          <p>Designed with warmth and care. We've stripped away the clinical feel to give you an experience that feels like a supportive friend.</p>
        </div>

        <div className="about-value-card hover-lift">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <h3>Data-Driven Insights</h3>
          <p>We use advanced predictive insights and visualizations to accurately forecast your upcoming cycle dates and symptom trends over time.</p>
        </div>

        <div className="about-value-card hover-lift">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <h3>Total Privacy</h3>
          <p>Your intimate health data belongs strictly to you. Our systems use industry-standard security to ensure your peace of mind.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
