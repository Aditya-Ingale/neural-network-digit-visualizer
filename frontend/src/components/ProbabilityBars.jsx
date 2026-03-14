export default function ProbabilityBars({ prediction }) {
  const probabilities = prediction?.probabilities || Array(10).fill(0);
  const maxProb = Math.max(...probabilities);
  const predictedIndex = probabilities.indexOf(maxProb);

  return (
    <div style={{ width: "100%" }}>
      {probabilities.map((prob, i) => {
        const isActive = i === predictedIndex && maxProb > 0;
        return (
          <div key={i} className="prob-row">
            <div className={`prob-digit ${isActive ? "active" : ""}`}>
              {i}
            </div>

            <div className="prob-bar-track">
              <div
                className={`prob-bar-fill ${isActive ? "active" : ""}`}
                style={{ width: `${prob * 100}%` }}
              />
            </div>

            <div className={`prob-pct ${isActive ? "active" : ""}`}>
              {(prob * 100).toFixed(1)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}