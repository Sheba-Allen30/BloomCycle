export default function Features() {
  return (
    <div className="page-section">
      <h1>Features</h1>

      <table className="features-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Free</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Cycle Tracking</td><td>✔</td><td>✔</td></tr>
          <tr><td>Predictions</td><td>✔</td><td>✔</td></tr>
          <tr><td>Insights</td><td>Limited</td><td>Advanced</td></tr>
          <tr><td>Health Reports</td><td>✖</td><td>✔</td></tr>
          <tr><td>Doctor Tips</td><td>✖</td><td>✔</td></tr>
        </tbody>
      </table>
    </div>
  );
}
