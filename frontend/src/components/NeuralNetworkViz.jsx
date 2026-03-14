import { useEffect, useRef } from "react";

export default function NeuralNetworkViz({ prediction }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#0d1a2a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!prediction) return;

    drawNetwork(ctx, prediction.probabilities);
  }, [prediction]);

  const drawNetwork = (ctx, probabilities) => {
    const width = 400;
    const height = 520;

    // Clear with background
    ctx.fillStyle = "#0d1a2a";
    ctx.fillRect(0, 0, width, height);

    const inputX = 70;
    const hiddenX = 200;
    const outputX = 330;

    const inputCount = 8;
    const hiddenCount = 12;
    const outputCount = 10;

    const inputSpacing = height / (inputCount + 1);
    const hiddenSpacing = height / (hiddenCount + 1);
    const outputSpacing = height / (outputCount + 1);

    // Build node positions
    const inputNodes = Array.from({ length: inputCount }, (_, i) => ({
      x: inputX,
      y: inputSpacing * (i + 1)
    }));

    const hiddenNodes = Array.from({ length: hiddenCount }, (_, i) => ({
      x: hiddenX,
      y: hiddenSpacing * (i + 1)
    }));

    const outputNodes = Array.from({ length: outputCount }, (_, i) => ({
      x: outputX,
      y: outputSpacing * (i + 1)
    }));

    const predictedIndex = probabilities.indexOf(Math.max(...probabilities));

    // Draw input → hidden connections (faint)
    ctx.lineWidth = 0.5;
    inputNodes.forEach((iNode) => {
      hiddenNodes.forEach((hNode) => {
        ctx.beginPath();
        ctx.moveTo(iNode.x, iNode.y);
        ctx.lineTo(hNode.x, hNode.y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.stroke();
      });
    });

    // Draw hidden → output connections
    ctx.lineWidth = 0.8;
    hiddenNodes.forEach((hNode) => {
      outputNodes.forEach((oNode, oIndex) => {
        ctx.beginPath();
        ctx.moveTo(hNode.x, hNode.y);
        ctx.lineTo(oNode.x, oNode.y);
        if (oIndex === predictedIndex) {
          ctx.strokeStyle = "rgba(0, 255, 153, 0.5)";
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
          ctx.lineWidth = 0.5;
        }
        ctx.stroke();
      });
    });

    // Draw a node helper
    const drawNode = (x, y, intensity) => {
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);

      ctx.shadowColor = "#00ff99";
      ctx.shadowBlur = 5 + intensity * 20;

      const green = Math.floor(80 + intensity * 175);
      ctx.fillStyle = `rgb(0, ${green}, 150)`;
      ctx.fill();

      ctx.shadowBlur = 0;
    };

    // Draw all nodes
    inputNodes.forEach(n => drawNode(n.x, n.y, 0.15));
    hiddenNodes.forEach(n => drawNode(n.x, n.y, 0.2));
    outputNodes.forEach((n, i) => drawNode(n.x, n.y, probabilities[i]));
  };

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={520}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
        borderRadius: "8px"
      }}
    />
  );
}