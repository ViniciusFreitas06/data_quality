from pydantic import BaseModel
from typing import Dict, List, Any

class AnalysisResponse(BaseModel):
    rows: int
    columns: int
    column_names: List[str]
    null_percentage: Dict[str, float]
    duplicate_rows: int
    constant_columns: List[str]
    numeric_stats: Dict[str, Any]
    outliers: Dict[str, int]
    correlations: List[Dict[str, Any]]
    warnings: List[str]