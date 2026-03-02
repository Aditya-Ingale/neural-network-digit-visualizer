import { useRef, useState, useEffect}  from "react";
import { predictDigit } from "../services/api";

export default function CanvasBoard({setPrediction}){
    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);
    const debounceRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        // Black background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 20;
        ctx.lineCap = "round";
        ctx.strokeStyle = "white";
    }, []);

        const getImageDataArray = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        return imageData.data; // RGBA flat array
    };

    const convertTo28x28 = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

        const data = imageData.data;
        const downscaled = [];
        const scale = 10; // 280 / 28

        for(let y = 0; y < 28; y++){
            for(let x = 0; x < 28; x++){

                let sum = 0;

                for(let dy = 0; dy < scale; dy++){
                    for(let dx = 0; dx < scale; dx++){

                        const pixelX = x * scale + dx;
                        const pixelY = y * scale + dy;

                        const pixelIndex = (pixelY * canvas.width + pixelX) * 4;

                        const red = data[pixelIndex]; // white stroke uses R=255
                        sum += red;
                    }
                }

                const avg = sum / (scale * scale);
                downscaled.push(avg);
            }
        }
        return downscaled;
    };

    const startDrawing = (e) => {
    isDrawingRef.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    ctx.beginPath();
    ctx.moveTo(
        e.clientX - rect.left,
        e.clientY - rect.top
    );
    };

    const stopDrawing = async (e) => {
        isDrawingRef.current = false;

        const pixels = convertTo28x28();

        const normalized = pixels.map(v => v / 255.0);
        
        try{
            const result = await predictDigit(normalized);
            setPrediction(result);
        }
        catch(error){
            console.error(error);
        }
    };

    const draw = (e) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    ctx.lineTo(
        e.clientX - rect.left,
        e.clientY - rect.top
    );
    ctx.stroke();

    if (debounceRef.current) {
        clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
        const pixels = convertTo28x28();
        const normalized = pixels.map(v => v / 255.0);

        try {
        const result = await predictDigit(normalized);
        setPrediction(result);
        } catch (err) {
        console.error(err);
        }
    }, 200);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    };

    return (
        <div style = {{ textAlign: "center "}}>
            <canvas
                ref={canvasRef}
                width={280}
                height={280}
                style={{
                  background: "black",
                  border: "1px solid #333",
                  borderRadius: "6px"
                }}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseLeave={stopDrawing}
            />
            <br />
            <button onClick={clearCanvas} style={{ marginTop: "10px"}}>
                Clear
            </button>
        </div>
    );
}