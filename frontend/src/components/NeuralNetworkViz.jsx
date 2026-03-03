import { useEffect, useRef } from "react";  

export default function NeuralNetworkViz({ prediction }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear background
    ctx.fillStyle = "#0d1b2a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!prediction) return;

    const probabilities = prediction.probabilities;  // ✅ DEFINE IT HERE

    drawNetwork(ctx, probabilities);
  }, [prediction]);

  const drawNetwork = (ctx, probabilities) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    const outputX = width - 80;
    const layerTop = 50;
    const layerSpacing = 40;

    probabilities.forEach((prob, i) => {
      const y = layerTop + i * layerSpacing;

        ctx.beginPath();

        const intensity = prob; // 0–1
        const radius = 15; // fixed size

        ctx.arc(outputX, y, radius, 0, Math.PI * 2);

        // Glow effect (only glow changes)
        ctx.shadowColor = "#00ff99";
        ctx.shadowBlur = 5 + intensity * 30;

        // Brightness scaling
        const green = Math.floor(80 + intensity * 175);
        ctx.fillStyle = `rgb(0, ${green}, 150)`;
        ctx.fill();

        // Border scales slightly
        ctx.lineWidth = 1 + intensity * 2;
        ctx.strokeStyle = `rgb(0, ${green}, 150)`;
        ctx.stroke();

        // Reset shadow
        ctx.shadowBlur = 0;
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ background: "#0d1b2a", borderRadius: "8px" }}
    />
  );
}