import CanvasBoard from "./components/CanvasBoard";

function App() {
  return (
    <div style={{ 
      background: "#111", 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      color: "white"
    }}>
      <CanvasBoard />
    </div>
  );
}

export default App;