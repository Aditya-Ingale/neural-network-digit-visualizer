import os
from tensorflow import keras

def load_model():
    model_path = os.path.join(
        os.path.dirname(__file__),
        "mnist_model.h5"
    )

    model = keras.models.load_model(model_path)
    return model