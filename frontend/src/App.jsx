import {useState} from "react";
import CanvasBoard from "./components/CanvasBoard";
import ProbabilityBars from "./components/ProbabilityBars";

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
      <h1 style={{ marginBottom: "30px" }}>
        Neural Network Digit Visualizer
      </h1>

      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "center"
        }}
      >
        <CanvasBoard setPrediction={setPrediction} />

        {prediction && (
          <ProbabilityBars probabilities={prediction.probabilities} />
        )}
      </div>

      {prediction && (
        <div style={{ marginTop: "30px", fontSize: "28px" }}>
          Predicted:{" "}
          <span style={{ color: "#00ff99" }}>
            {prediction.predicted_digit}
          </span>{" "}
          ({(prediction.confidence * 100).toFixed(2)}%)
        </div>
      )}

      {prediction && prediction.confidence < 0.6 &&(
        <div style = {{
          marginTop: "10px",
          color: "#ffcc00",
          frontSize: "16px"
        }}>
          Low confidence - try drawing a single clear digit.
          </div>
      )}

    </div>
  );
}

export default App;