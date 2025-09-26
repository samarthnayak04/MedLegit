from pydantic import BaseModel, Field
from typing import List

class FraudPredictionIn(BaseModel):
    ClaimDuration_mean: float
    ClaimDuration_max: float
    ClaimDuration_min: float
    NumDiagnosis_mean: float
    NumDiagnosis_max: float
    NumProcedure_mean: float
    NumProcedure_max: float
    RepeatedDiagnosisFlag_mean: float
    ReimbToDurationRatio_mean: float
    ReimbToDurationRatio_max: float
    InscClaimAmtReimbursed_sum: float
    InscClaimAmtReimbursed_mean: float
    IPAnnualReimbursementAmt_sum: float
    OPAnnualReimbursementAmt_sum: float
    BeneID_nunique: int
    Provider: str

class FraudPredictionOut(BaseModel):
    Provider: str
    PotentialFraud: str = Field(..., description="Predicted fraud label ('Yes' or 'No').")
    Fraud_Probability: float = Field(..., description="Probability of fraud, 0-1.")
