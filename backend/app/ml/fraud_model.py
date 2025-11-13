import pickle
import pandas as pd
import numpy as np
import xgboost as xgb

FEATURE_NAMES = [
    'ClaimDuration_mean', 'ClaimDuration_max', 'ClaimDuration_min',
    'NumDiagnosis_mean', 'NumDiagnosis_max', 'NumProcedure_mean',
    'NumProcedure_max', 'RepeatedDiagnosisFlag_mean',
    'ReimbToDurationRatio_mean', 'ReimbToDurationRatio_max',
    'InscClaimAmtReimbursed_sum', 'InscClaimAmtReimbursed_mean',
    'IPAnnualReimbursementAmt_sum', 'OPAnnualReimbursementAmt_sum',
    'BeneID_nunique'
]

class FraudModel:
    def __init__(self, model_path: str):
        # Load model natively instead of pickle
        self.model = xgb.Booster()
        self.model.load_model(model_path)

    def predict(self, data: pd.DataFrame) -> np.ndarray:
        dmatrix = xgb.DMatrix(data)
        preds = self.model.predict(dmatrix)
        return (preds > 0.5).astype(int)  # thresholding for classification

    def predict_proba(self, data: pd.DataFrame) -> np.ndarray:
        dmatrix = xgb.DMatrix(data[FEATURE_NAMES])
        preds = self.model.predict(dmatrix)  # probabilities between 0–1
        return preds # probability scores

# Update to JSON path
fraud_model = FraudModel("aiModels/fraud_detection/xgboost_model.json")