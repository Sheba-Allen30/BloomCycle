import { useNavigate } from "react-router-dom";

function Membership() {
  const navigate = useNavigate();

  const upgradeToPremium = () => {
    localStorage.setItem("membership", "PREMIUM");
    alert("You are now a Premium Member 🌟");
    navigate("/dashboard");
  };

  return (
    <div className="membership-page">
      <h1>BloomCycle Membership</h1>
      <p className="subtitle">
        Unlock advanced cycle insights and predictions
      </p>

      <div className="membership-cards">
        {/* FREE */}
        <div className="membership-card">
          <h2>Free</h2>
          <ul>
            <li>✔ Period tracking</li>
            <li>✔ Symptom logging</li>
            <li>✔ Basic calendar</li>
            <li>✔ Next period prediction</li>
          </ul>
          <button disabled className="free-btn">Current Plan</button>
        </div>

        {/* PREMIUM */}
        <div className="membership-card premium">
          <h2>Premium 🌟</h2>
          <ul>
            <li>✔ Everything in Free</li>
            <li>✔ 3-month predictions</li>
            <li>✔ Ovulation window</li>
            <li>✔ Advanced insights</li>
            <li>✔ Charts & trends</li>
          </ul>
          <button className="premium-btn" onClick={upgradeToPremium}>
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Membership;
