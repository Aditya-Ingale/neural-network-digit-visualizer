export default function ProbabilityBars({ probabilities }) {
  return (
    <div style={{ marginTop: "30px", width: "300px" }}>
      {probabilities.map((prob, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px"
          }}
        >
          <div style={{ width: "20px" }}>{index}</div>

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
                background: "#00ff99",
                transition: "width 0.2s ease"
              }}
            />
          </div>

          <div style={{ width: "50px", textAlign: "right", marginLeft: "8px" }}>
            {(prob * 100).toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
}