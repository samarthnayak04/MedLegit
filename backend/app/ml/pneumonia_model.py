# # app/ml/pneumonia_model.py
# import io
# import numpy as np
# from PIL import Image
# from tensorflow.keras.applications import ResNet50
# from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout, Input
# from tensorflow.keras.models import Model, load_model

# class PneumoniaModel:
#     def __init__(self, model_path: str):
#         # Try to load full model first (works when model was saved correctly)
#         try:
#             self.model = load_model(model_path, compile=False)
#             print("Loaded model via load_model()")
#         except Exception as e:
#             print("load_model() failed:", e)
#             print("Rebuilding architecture and trying load_weights() ...")
#             # Rebuild correct architecture (Functional API)
#             base = ResNet50(weights=None, include_top=False, input_shape=(224,224,3))
#             x = GlobalAveragePooling2D()(base.output)
#             x = Dense(256, activation='relu')(x)
#             x = Dropout(0.5)(x)
#             preds = Dense(1, activation='sigmoid')(x)
#             self.model = Model(inputs=base.input, outputs=preds)

#             # Try loading weights
#             try:
#                 self.model.load_weights(model_path)
#                 print("Weights loaded into rebuilt model")
#             except Exception as e2:
#                 # last-resort: try by_name
#                 try:
#                     self.model.load_weights(model_path, by_name=True, skip_mismatch=True)
#                     print("Weights loaded by_name=True skip_mismatch=True (check for mismatches).")
#                 except Exception as e3:
#                     raise RuntimeError(f"Failed to load model or weights: {e2} / {e3}")

#     def preprocess(self, img_bytes: bytes):
#         img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
#         img = img.resize((224, 224))
#         arr = np.array(img, dtype=np.float32) / 255.0   # must match your training's rescale
#         arr = np.expand_dims(arr, 0)
#         return arr

#     def predict(self, img_bytes: bytes):
#         img_array = self.preprocess(img_bytes)
#         pred = self.model.predict(img_array, verbose=0)[0][0]
#         label = "Pneumonia" if pred > 0.5 else "Normal"
#         confidence = float(pred if pred > 0.5 else 1 - pred)
#         return label, confidence

# # instantiate once (fastapi import will load it)
# pneumonia_model = PneumoniaModel("aiModels/disease_predictor/pneumonia_detection.h5")


import io
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model

class PneumoniaModel:
    def __init__(self, model_path: str):
        # Directly load the full saved model (.keras or .h5)
        self.model = load_model(model_path, compile=False)
        print(f"Model loaded successfully from {model_path}")

    def preprocess(self, img_bytes: bytes):
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img = img.resize((224, 224))
        arr = np.array(img, dtype=np.float32) / 255.0   # must match training rescale
        arr = np.expand_dims(arr, 0)                   # add batch dimension
        return arr

    def predict(self, img_bytes: bytes):
        img_array = self.preprocess(img_bytes)
        pred = self.model.predict(img_array, verbose=0)[0][0]
        label = "Pneumonia" if pred > 0.5 else "Normal"
        confidence = float(pred if pred > 0.5 else 1 - pred)
        return label, confidence


# ✅ instantiate once for FastAPI
# Prefer .keras, fallback to .h5
pneumonia_model = PneumoniaModel("aiModels/disease_predictor/pneumonia_resnet50_classifier.keras")
