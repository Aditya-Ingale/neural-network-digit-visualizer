import {useState} from "react";
import CanvasBoard from "./components/CanvasBoard";
import ProbabilityBars from "./components/ProbabilityBars";

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div style={{ 
      background: "#111", 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      color: "white",
      paddingTop: "40px"
    }}>

      <h1>Neural Network digit Visualizer</h1>

      <CanvasBoard setPrediction={setPrediction}/>
      {prediction && (
        <>
        <ProbabilityBars probabilities={prediction.probabilities}/>

        <div style={{marginTop: "20px", frontSize: "24x"}}>
          Predicted: {prediction.predicted_digit}
          ({(prediction.confidence * 100).toFixed(2)}%)
        </div>
        </>
      )}
    </div>
  );
}

export default App;