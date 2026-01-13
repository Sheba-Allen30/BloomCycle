function Landing() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>BloomCycle</h1>
        <p>
          A simple and secure web application to track your menstrual cycle,
          symptoms, and overall wellbeing.
        </p>

        <div className="hero-buttons">
          <a href="/register" className="btn-primary">Get Started</a>
          <a href="/login" className="btn-secondary">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
