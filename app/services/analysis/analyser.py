import pandas as pd
import numpy as np

from app.services.analysis.basic_info import calculate_basic_info
from app.services.analysis.null_analysis import calculate_null_percentage
from app.services.analysis.constant_columns import find_constant_columns
from app.services.analysis.statistics import calculate_numeric_stats
from app.services.analysis.outliers import detect_outliers
from app.services.analysis.correlations import calculate_correlations
from app.services.analysis.warnings import generate_warnings
from app.services.analysis.quality_score import calculate_quality_score
from app.services.analysis.ml_outliers import detect_ml_outliers

def analyze_dataset(file):

    # =========================
    # Read Dataset
    # =========================

    df = pd.read_csv(
        file,
        low_memory=False
    )

    numeric_cols = df.select_dtypes(
        include=np.number
    ).columns

    # =========================
    # Basic Analysis
    # =========================

    basic_info = calculate_basic_info(df)

    null_percentage = calculate_null_percentage(df)

    duplicate_rows = int(
        df.duplicated().sum()
    )

    constant_columns = find_constant_columns(df)

    # =========================
    # Statistical Analysis
    # =========================

    numeric_stats = calculate_numeric_stats(
        df,
        numeric_cols
    )

    correlations = calculate_correlations(
        df,
        numeric_cols
    )

    statistical_outliers = detect_outliers(
        df,
        numeric_cols
    )

    ml_outliers = detect_ml_outliers(
    df,
    numeric_cols
    )

    # =========================
    # Insights
    # =========================

    warnings = generate_warnings(
        null_percentage,
        duplicate_rows,
        constant_columns,
        correlations,
        statistical_outliers,
        basic_info["rows"]
    )

    quality = calculate_quality_score(
        null_percentage,
        duplicate_rows,
        constant_columns,
        correlations,
        statistical_outliers,
        basic_info["rows"]
    )

    # =========================
    # Final Response
    # =========================

    return {
        **basic_info,

        "quality": quality,

        "null_percentage":
            null_percentage.to_dict(),

        "duplicate_rows":
            duplicate_rows,

        "constant_columns":
            constant_columns,

        "numeric_stats":
            numeric_stats,

        "statistical_outliers":
            statistical_outliers,

        "ml_outliers":
            ml_outliers,

        "correlations":
            correlations,

        "warnings":
            warnings
    }