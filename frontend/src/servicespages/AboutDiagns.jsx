import React from "react";
import { Link } from "react-router-dom";

export default function AboutDiagnos() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-10">

        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 text-center">
          Pneumonia Detection Module
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Overview</h2>
          <p>
            The Pneumonia Detection module automates identification of pneumonia from chest X-ray images using deep learning. It leverages transfer learning with ResNet50 and classifies images into Normal and Pneumonia categories.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Dataset</h2>
          <p>
            The Chest X-Ray Images (Pneumonia) dataset contains 5,863 X-ray images split into train, validation, and test sets. Images are resized to 224x224 pixels and normalized.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Methodology</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Data Augmentation: Rotation, Shift, Zoom, Shear, Horizontal Flip, Rescaling</li>
            <li>Model Architecture: ResNet50 base + custom dense head (GlobalAveragePooling + Dense + Dropout + Sigmoid)</li>
            <li>Training: Adam optimizer, binary cross-entropy loss, EarlyStopping, ReduceLROnPlateau, ModelCheckpoint</li>
            <li>Evaluation: Accuracy, Precision, Recall, F1-score, ROC-AUC</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Results</h2>
          <p>
            Model performance: Accuracy ~96.3%, Precision 95.4%, Recall 97.1%, F1-score 96.2%, ROC-AUC 0.982. Minimal false negatives ensure reliable diagnostic support.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Integration</h2>
          <p>
            Integrated into MedLegit via FastAPI backend for real-time inference, with frontend visualization of results and confidence scores.
          </p>
        </section>

        <div className="flex justify-center mt-6">
          <Link
            to="/services"
            className="py-2 px-6 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white font-medium shadow-md transition transform hover:scale-105"
          >
            Back to Services
          </Link>
        </div>

      </div>
    </div>
  );
}
