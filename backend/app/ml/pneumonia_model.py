

import io
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.resnet50 import preprocess_input
class PneumoniaModel:
    def __init__(self, model_path: str):
        # Directly load the full saved model (.keras or .h5)
        self.model = load_model(model_path, compile=False)
        # print(f"Model loaded successfully from {model_path}")

    def preprocess(self, img_bytes: bytes):
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img = img.resize((224, 224))
        arr = preprocess_input(np.array(img, dtype=np.float32))  # must match training rescale
        arr = np.expand_dims(arr, 0)                   # add batch dimension
        return arr

    def predict(self, img_bytes: bytes):
        img_array = self.preprocess(img_bytes)
        pred = self.model.predict(img_array, verbose=0)[0][0]
        label = "Pneumonia" if pred >= 0.7006 else "Normal"
        confidence = float(pred if pred >= 0.7006 else 1 - pred)
        return label, confidence


# ✅ instantiate once for FastAPI
# Prefer .keras, fallback to .h5
pneumonia_model = PneumoniaModel("aiModels/disease_predictor/pneumonia_classifier1.keras")
