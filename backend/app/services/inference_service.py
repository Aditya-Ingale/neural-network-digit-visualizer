import numpy as np

def preprocess_input(image_array):
    if len(image_array) != 784:
        raise ValueError(f"Expected 784 values, got {len(image_array)}")

    image = np.array(image_array, dtype=np.float32)
    image = image.reshape(28, 28)
    image = np.expand_dims(image, axis=-1)
    image = np.expand_dims(image, axis=0)
    return image

def predict_digit(model, image_array):
    processed_image = preprocess_input(image_array)
    predictions = model.predict(processed_image)
    probabilities = predictions[0].tolist()
    predicted_digit = int(np.argmax(probabilities))
    confidence = float(np.max(probabilities))

    return {
        "probabilities": probabilities,
        "predicted_digit": predicted_digit,
        "confidence": confidence
    }