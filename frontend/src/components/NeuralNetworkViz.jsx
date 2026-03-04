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

        const inputX = 100;
        const hiddenX = width / 2;
        const outputX = width - 100;

        const inputCount = 8;
        const hiddenCount = 12;
        const outputCount = 10;

        const inputSpacing = height / (inputCount + 1);
        const hiddenSpacing = height / (hiddenCount + 1);
        const outputSpacing = height / (outputCount + 1);

        // Store node positions
        const inputNodes = [];
        const hiddenNodes = [];
        const outputNodes = [];

        for (let i = 0; i < inputCount; i++) {
            inputNodes.push({ x: inputX, y: inputSpacing * (i + 1) });
        }

        for (let i = 0; i < hiddenCount; i++) {
            hiddenNodes.push({ x: hiddenX, y: hiddenSpacing * (i + 1) });
        }

        for (let i = 0; i < outputCount; i++) {
            outputNodes.push({ x: outputX, y: outputSpacing * (i + 1) });
        }

        // ===== Draw connections =====

        const predictedIndex = probabilities.indexOf(Math.max(...probabilities));

        ctx.lineWidth = 1;

        hiddenNodes.forEach((hNode, hIndex) => {
            outputNodes.forEach((oNode, oIndex) => {
            ctx.beginPath();
            ctx.moveTo(hNode.x, hNode.y);
            ctx.lineTo(oNode.x, oNode.y);

            if (oIndex === predictedIndex) {
                ctx.strokeStyle = "rgba(0, 255, 150, 0.6)";
            } else {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            }

            ctx.stroke();
            });
        });

        inputNodes.forEach((iNode) => {
            hiddenNodes.forEach((hNode) => {
            ctx.beginPath();
            ctx.moveTo(iNode.x, iNode.y);
            ctx.lineTo(hNode.x, hNode.y);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.stroke();
            });
        });

        // ===== Draw nodes =====

        const drawNode = (x, y, intensity = 0.1) => {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);

            ctx.shadowColor = "#00ff99";
            ctx.shadowBlur = 5 + intensity * 20;

            const green = Math.floor(80 + intensity * 175);
            ctx.fillStyle = `rgb(0, ${green}, 150)`;
            ctx.fill();

            ctx.shadowBlur = 0;
        };

        inputNodes.forEach(node => drawNode(node.x, node.y, 0.1));
        hiddenNodes.forEach(node => drawNode(node.x, node.y, 0.2));

        outputNodes.forEach((node, i) => {
            drawNode(node.x, node.y, probabilities[i]);
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