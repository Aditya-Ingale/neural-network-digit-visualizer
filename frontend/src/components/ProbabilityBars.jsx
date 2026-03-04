export default function ProbabilityBars({ prediction }) {

  const probabilities = prediction?.probabilities || Array(10).fill(0);

  const maxProb = Math.max(...probabilities);
  const predictedIndex = probabilities.indexOf(maxProb);

  return (
    <div style={{ marginTop: "30px", width: "320px" }}>
      {probabilities.map((prob, i) => {

        const isActive = i === predictedIndex;

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px"
            }}
          >
            {/* Digit Label */}
            <div
              style={{
                width: "20px",
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#00ff99" : "white"
              }}
            >
              {i}
            </div>

            {/* Bar Background */}
            <div
              style={{
                flex: 1,
                background: "#333",
                height: "18px",
                marginLeft: "10px",
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden"
              }}
            >
              {/* Bar Fill */}
              <div
                style={{
                  width: `${prob * 100}%`,
                  height: "100%",
                  background: isActive ? "#00ff99" : "#555",
                  transition: "width 0.15s ease-out",
                  boxShadow: isActive
                    ? "0 0 8px #00ff99"
                    : "none"
                }}
              />
            </div>

            {/* Percentage Text */}
            <div
              style={{
                width: "60px",
                textAlign: "right",
                marginLeft: "8px",
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#00ff99" : "white"
              }}
            >
              {(prob * 100).toFixed(1)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}