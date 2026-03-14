import { useState } from "react";
import CanvasBoard from "./components/CanvasBoard";
import ProbabilityBars from "./components/ProbabilityBars";
import NeuralNetworkViz from "./components/NeuralNetworkViz";
import "./App.css";

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="app">

      <header className="app-header">
        <h1 className="app-title">
          Neural Network <span>Digit</span> Visualizer
        </h1>
        <p className="app-subtitle">
          Draw a digit (0–9) on the canvas. A CNN trained on MNIST predicts it in real-time.
        </p>
        <div className="app-meta">
          <span className="meta-tag">CNN</span>
          <span className="meta-tag">121K params</span>
          <span className="meta-tag">99.04% accuracy</span>
          <span className="meta-tag">FastAPI</span>
          <span className="meta-tag">TensorFlow</span>
        </div>
      </header>

      <div className="dashboard">

        {/* Column 1 — Canvas */}
        <div className="panel canvas-panel">
          <span className="panel-label">Input</span>
          <CanvasBoard setPrediction={setPrediction} />
        </div>

        {/* Column 2 — Probabilities */}
        <div className="panel">
          <span className="panel-label">Class Probabilities</span>
          <ProbabilityBars prediction={prediction} />
        </div>

        {/* Column 3 — Neural Network */}
        <div className="panel netviz-panel">
          <span className="panel-label">Network Activation</span>
          <NeuralNetworkViz prediction={prediction} />
        </div>

        {/* Column 4 — Decision */}
        <div className="panel decision-panel">
          <span className="panel-label">Model Decision</span>

          {prediction ? (
            <>
              <div className="decision-digit">
                {prediction.predicted_digit}
              </div>

              <div className="confidence-label">Confidence</div>
              <div className="confidence-value">
                {(prediction.confidence * 100).toFixed(1)}%
              </div>

              <div className="confidence-bar-track">
                <div
                  className="confidence-bar-fill"
                  style={{ width: `${prediction.confidence * 100}%` }}
                />
              </div>

              {prediction.confidence < 0.6 && (
                <div className="low-confidence-warning">
                  Low confidence — try drawing a single clear digit.
                </div>
              )}
            </>
          ) : (
            <div className="waiting-text">—</div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;