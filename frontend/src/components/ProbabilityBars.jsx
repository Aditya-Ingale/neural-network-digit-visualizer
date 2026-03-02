export default function ProbabilityBars({ probabilities }) {
  const maxIndex = probabilities.indexOf(Math.max(...probabilities));

  return (
    <div style={{ marginTop: "30px", width: "320px" }}>
      {probabilities.map((prob, index) => {
        const isActive = index === maxIndex;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px"
            }}
          >
            <div
              style={{
                width: "20px",
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#00ff99" : "white"
              }}
            >
              {index}
            </div>

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