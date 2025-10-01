from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
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
    Fraud_Probability: float = Field(..., description="Probability of fraud as percentage, 0-100%.")
class FraudCaseOut(BaseModel):
    id: int
    provider: str = Field(..., alias="Provider")
    potential_fraud: str = Field(..., alias="PotentialFraud")
    fraud_probability: float = Field(..., alias="Fraud_Probability")
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)