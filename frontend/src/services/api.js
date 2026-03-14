const API_URL = "https://neural-network-digit-visualizer.onrender.com";

export async function predictDigit(imageArray){
    const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: imageArray})
    });

    if(!response.ok) {
        throw new Error("Prediction failed");
    }

    return await response.json();
}