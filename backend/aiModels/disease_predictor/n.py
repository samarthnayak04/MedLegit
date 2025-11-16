import tensorflow as tf

# Load the Keras model
model = tf.keras.models.load_model(r"pneumonia_classifier1.keras", compile=False)
print("Model loaded successfully")
# Create converter
converter = tf.lite.TFLiteConverter.from_keras_model(model)

# Convert the model
tflite_model = converter.convert()

# Save as .tflite
with open("pneumonia_classifier1.tflite", "wb") as f:
    f.write(tflite_model)

print("Model converted and saved as .tflite")
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()
with open("pneumonia_classifier1_quant.tflite", "wb") as f:
    f.write(tflite_model)
print("Quantized model saved as .tflite")