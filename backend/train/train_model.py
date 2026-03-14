import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers


# import numpy as np
# import os

# def load_data():
#     (x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()
#     return (x_train, y_train), (x_test, y_test)

# def preprocess_data(x_train, y_train, x_test, y_test):
#     #Normalize
#     x_train = x_train.astype("float32") / 255.0
#     x_test = x_test.astype("float32") / 255.0

#     return x_train, y_train, x_test, y_test

# def build_model():
#     inputs = keras.Input(shape=(28, 28))
#     x = layers.Flatten()(inputs)
#     x = layers.Dense(128, activation="relu")(x)
#     x = layers.Dense(64, activation="relu")(x)
#     outputs = layers.Dense(10, activation="softmax")(x)

#     model = keras.Model(inputs=inputs, outputs=outputs)

#     model.compile(
#         optimizer="adam", 
#         loss="sparse_categorical_crossentropy",
#         metrics=["accuracy"]
#     )

#     return model

# def train_model(model, x_train, y_train):
#     model.fit(
#         x_train,
#         y_train,
#         epochs=5,
#         batch_size=128,
#         validation_split=0.1
#     )

# def save_model(model):
#     model_dir = os.path.join(os.path.dirname(__file__), "..", "app", "model")
#     os.makedirs(model_dir, exist_ok=True)

#     model_path = os.path.join(model_dir, "mnist_model.keras")
#     model.save(model_path)

#     print(f"Model saved at: {model_path}")

# def main():
#     (x_train, y_train), (x_test, y_test) = load_data()
#     x_train, y_train, x_test, y_test = preprocess_data(x_train, y_train, x_test, y_test)

#     model = build_model()
#     train_model(model, x_train, y_train)

#     save_model(model)

# if __name__ == "__main__":
#     main()



# Load MNIST
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# Normalize
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# Add channel dimension for CNN
x_train = x_train[..., tf.newaxis]  # (60000, 28, 28, 1)
x_test = x_test[..., tf.newaxis]

# Build CNN model
inputs = keras.Input(shape=(28, 28, 1))

x = layers.Conv2D(32, (3, 3), activation="relu")(inputs)
x = layers.MaxPooling2D((2, 2))(x)

x = layers.Conv2D(64, (3, 3), activation="relu")(x)
x = layers.MaxPooling2D((2, 2))(x)

x = layers.Flatten()(x)
x = layers.Dense(64, activation="relu")(x)

outputs = layers.Dense(10, activation="softmax")(x)

model = keras.Model(inputs=inputs, outputs=outputs)

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.summary()

model.fit(
    x_train,
    y_train,
    epochs=5,
    validation_data=(x_test, y_test)
)

model.save("../app/model/mnist_model.keras")

print("CNN Model saved successfully.")