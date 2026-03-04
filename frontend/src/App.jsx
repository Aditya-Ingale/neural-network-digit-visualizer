import { useState } from "react";
import CanvasBoard from "./components/CanvasBoard";
import ProbabilityBars from "./components/ProbabilityBars";
import NeuralNetworkViz from "./components/NeuralNetworkViz";

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        paddingTop: "40px"
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>
        Neural Network Digit Visualizer
      </h1>

      {/* Small Description */}
      <p style={{ marginBottom: "40px", opacity: 0.7 }}>
        Draw a digit (0–9). The model predicts it in real-time using a CNN trained on MNIST.
      </p>

      {/* ===== 4 COLUMN LAYOUT ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "70px",
          width: "100%",
          maxWidth: "1400px"
        }}
      >
        {/* Column 1 - Canvas */}
        <div style={{ width: "320px" }}>
          <CanvasBoard setPrediction={setPrediction} />
        </div>

        {/* Column 2 - Probabilities */}
        <div style={{ width: "300px" }}>
          <ProbabilityBars prediction={prediction} />
        </div>

        {/* Column 3 - Neural Network */}
        <div style={{ width: "400px" }}>
          <NeuralNetworkViz prediction={prediction} />
        </div>

        {/* Column 4 - Decision Panel */}
        <div
          style={{
            width: "130px",
            padding: "20px",
            background: "#1e293b",
            borderRadius: "12px",
            textAlign: "center"
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Model Decision</h3>

          {prediction ? (
            <>
              <div style={{ fontSize: "35px", color: "#00ff99" }}>
                {prediction.predicted_digit}
              </div>

              <div style={{ marginTop: "5px", fontSize: "15px" }}>
                Confidence
              </div>

              <div style={{ fontSize: "20px", marginTop: "5px" }}>
                {(prediction.confidence * 100).toFixed(2)}%
              </div>

              {prediction.confidence < 0.6 && (
                <div
                  style={{
                    marginTop: "15px",
                    color: "#ffcc00",
                    fontSize: "14px"
                  }}
                >
                  Low confidence — try a clearer digit.
                </div>
              )}
            </>
          ) : (
            <div style={{ opacity: 0.5 }}>
              Waiting for input...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;