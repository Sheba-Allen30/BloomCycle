function About() {
  return (
    <div className="page-section">
      <div className="section-card about-card">
        <h1 className="about-title">About BloomCycle</h1>

        <section className="about-section">
          <h2>Overview</h2>
          <p>
            BloomCycle is a web-based menstrual cycle tracking system designed
            to help users monitor their periods, symptoms, and overall cycle
            health. The application provides predictive insights and visual
            analytics to promote awareness and better personal health
            management.
          </p>
        </section>

        <section className="about-section">
          <h2>Problem Statement</h2>
          <p>
            Many individuals face difficulties in accurately tracking their
            menstrual cycles and identifying patterns related to health and
            wellbeing. Existing solutions are often complex or inaccessible.
            BloomCycle aims to provide a simple, user-friendly, and secure web
            platform for cycle tracking and analysis.
          </p>
        </section>

        <section className="about-section">
          <h2>Objectives</h2>
          <ul>
            <li>Provide an easy-to-use menstrual cycle tracking system</li>
            <li>Predict upcoming cycle dates using historical data</li>
            <li>Enable symptom tracking and visualization</li>
            <li>Offer advanced insights through a membership model</li>
            <li>Promote awareness of menstrual health</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Target Users</h2>
          <p>
            BloomCycle is intended for individuals who wish to monitor their
            menstrual cycles digitally, including students, working
            professionals, and anyone seeking better insight into their
            reproductive health.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
