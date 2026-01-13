import { Link } from "react-router-dom";

function Insights() {
  const membership = localStorage.getItem("membership") || "FREE";
  const cycleLength = 28;
  const periodDuration = 5;

  const lastPeriod = JSON.parse(localStorage.getItem("lastPeriod"));
  const symptomsData = JSON.parse(localStorage.getItem("symptoms"));

  let nextPeriod = "Not available";

  if (lastPeriod?.startDate) {
    const lastStart = new Date(lastPeriod.startDate);
    const nextStart = new Date(lastStart);
    nextStart.setDate(lastStart.getDate() + cycleLength);
    nextPeriod = nextStart.toDateString();
  }

  /* FREE USER VIEW */
  if (membership !== "PREMIUM") {
    return (
      <div className="insights-page">
        <h1>Insights 🔒</h1>
        <p className="subtitle">
          Advanced insights are available for Premium members only.
        </p>

        <Link to="/membership" className="upgrade-banner">
          Upgrade to Premium →
        </Link>
      </div>
    );
  }

  /* PREMIUM VIEW */
  const symptomCounts = {};
  if (symptomsData?.symptoms) {
    symptomsData.symptoms.forEach((s) => {
      symptomCounts[s] = (symptomCounts[s] || 0) + 1;
    });
  }

  return (
    <div className="insights-page">
      <h1>Insights</h1>
      <p className="subtitle">
        Advanced cycle analytics and trends
      </p>

      <div className="insight-stats">
        <div className="stat-box">
          <h3>Avg Cycle</h3>
          <p>{cycleLength} Days</p>
        </div>

        <div className="stat-box">
          <h3>Period Length</h3>
          <p>{periodDuration} Days</p>
        </div>

        <div className="stat-box">
          <h3>Next Period</h3>
          <p>{nextPeriod}</p>
        </div>
      </div>

      <div className="symptom-summary">
        <h2>Symptom Frequency</h2>

        {Object.keys(symptomCounts).length ? (
          Object.keys(symptomCounts).map((symptom) => (
            <div key={symptom} className="symptom-row">
              <span>{symptom}</span>
              <div className="bar">
                <div
                  className="bar-fill"
                  style={{ width: `${symptomCounts[symptom] * 25}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p>No symptom data available.</p>
        )}
      </div>
    </div>
  );
}

export default Insights;
