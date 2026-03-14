import { useRef, useEffect } from "react";
import { predictDigit } from "../services/api";

export default function CanvasBoard({ setPrediction }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const requestIdRef = useRef(0);
  const lastPredictionTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";
  }, []);

  // Returns scaled x,y coords that match internal canvas resolution
  const getCoords = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const convertTo28x28 = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const downscaled = [];
    const scale = 10; // 280 / 28

    for (let y = 0; y < 28; y++) {
      for (let x = 0; x < 28; x++) {
        let sum = 0;
        for (let dy = 0; dy < scale; dy++) {
          for (let dx = 0; dx < scale; dx++) {
            const pixelX = x * scale + dx;
            const pixelY = y * scale + dy;
            const pixelIndex = (pixelY * canvas.width + pixelX) * 4;
            sum += data[pixelIndex];
          }
        }
        downscaled.push(sum / (scale * scale));
      }
    }
    return downscaled;
  };

  const startDrawing = (e) => {
    isDrawingRef.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoords(e, canvas);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = async () => {
    isDrawingRef.current = false;

    const pixels = convertTo28x28();
    const normalized = pixels.map(v => v / 255.0);

    try {
      const result = await predictDigit(normalized);
      setPrediction(result);
    } catch (error) {
      console.error(error);
    }
  };

  const draw = async (e) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoords(e, canvas);

    ctx.lineTo(x, y);
    ctx.stroke();

    const now = Date.now();
    if (now - lastPredictionTimeRef.current < 120) return;
    lastPredictionTimeRef.current = now;

    const currentRequestId = ++requestIdRef.current;
    const pixels = convertTo28x28();
    const normalized = pixels.map(v => v / 255.0);

    try {
      const result = await predictDigit(normalized);
      if (currentRequestId === requestIdRef.current) {
        setPrediction(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    setPrediction(null);
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        style={{
          background: "black",
          border: "1px solid #1e293b",
          borderRadius: "8px",
          cursor: "crosshair",
          display: "block",
          width: "100%",
          maxWidth: "260px",
          height: "auto",
          margin: "0 auto",
          touchAction: "none",
        }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
      />
      <button onClick={clearCanvas} className="clear-btn">
        Clear
      </button>
    </div>
  );
}