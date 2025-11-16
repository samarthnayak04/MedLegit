import io
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.applications.resnet50 import preprocess_input

class PneumoniaModelTFLite:
    def __init__(self, tflite_model_path: str):
        # Load the TFLite model
        self.interpreter = tf.lite.Interpreter(model_path=tflite_model_path)
        self.interpreter.allocate_tensors()
        
        # Get input and output details
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

    def preprocess(self, img_bytes: bytes):
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img = img.resize((224, 224))
        arr = preprocess_input(np.array(img, dtype=np.float32))
        arr = np.expand_dims(arr, 0)  # add batch dimension
        return arr.astype(np.float32)

    def predict(self, img_bytes: bytes):
        img_array = self.preprocess(img_bytes)

        # Set the tensor and invoke interpreter
        self.interpreter.set_tensor(self.input_details[0]['index'], img_array)
        self.interpreter.invoke()

        # Get prediction
        pred = self.interpreter.get_tensor(self.output_details[0]['index'])[0][0]
        label = "Pneumonia" if pred >= 0.7006 else "Normal"
        confidence = float(pred if pred >= 0.7006 else 1 - pred)
        return label, confidence


# Instantiate with quantized model
pneumonia_model = PneumoniaModelTFLite("aiModels/disease_predictor/pneumonia_classifier1_quant.tflite")
