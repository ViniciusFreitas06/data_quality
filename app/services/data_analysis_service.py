import pandas as pd
import numpy as np


def calculate_basic_info(df):
    rows, columns = df.shape

    return {
        "rows": rows,
        "columns": columns,
        "column_names": list(df.columns)
    }


def calculate_null_percentage(df):
    return (df.isnull().mean() * 100).round(2)


def find_constant_columns(df):
    return [col for col in df.columns if df[col].nunique() <= 1]


def calculate_numeric_stats(df, numeric_cols):
    stats = {}

    for col in numeric_cols:
        stats[col] = {
            "mean": float(df[col].mean()),
            "std": float(df[col].std()),
            "min": float(df[col].min()),
            "max": float(df[col].max())
        }

    return stats


def detect_outliers(df, numeric_cols):
    outliers = {}

    for col in numeric_cols:
        series = df[col].dropna()

        if series.std() == 0:
            continue

        z_scores = (series - series.mean()) / series.std()

        outliers[col] = int((np.abs(z_scores) > 3).sum())

    return outliers


def calculate_correlations(df, numeric_cols):
    correlations = []

    if len(numeric_cols) <= 1:
        return correlations

    corr_matrix = df[numeric_cols].corr()

    for i in range(len(corr_matrix.columns)):
        for j in range(i):

            value = corr_matrix.iloc[i, j]

            if abs(value) > 0.6:
                correlations.append({
                    "col1": corr_matrix.columns[i],
                    "col2": corr_matrix.columns[j],
                    "correlation": round(float(value), 2)
                })

    return correlations


def generate_warnings(
    null_percentage,
    duplicate_rows,
    constant_columns,
    correlations,
    outliers,
    rows
):
    warnings = []

    # Nulls
    high_nulls = null_percentage[null_percentage > 10]

    for col, pct in high_nulls.items():
        warnings.append(
            f"Coluna '{col}' possui {pct}% de valores nulos"
        )

    # Duplicatas
    if duplicate_rows > 0:
        warnings.append(
            f"Dataset possui {duplicate_rows} linhas duplicadas"
        )

    # Colunas constantes
    if constant_columns:
        warnings.append(
            f"Colunas sem variação: {', '.join(constant_columns)}"
        )

    # Correlações
    for corr in correlations:
        if abs(corr["correlation"]) > 0.8:
            warnings.append(
                f"Alta correlação entre "
                f"'{corr['col1']}' e '{corr['col2']}' "
                f"({corr['correlation']})"
            )

    # Outliers
    for col, count in outliers.items():
        if count > rows * 0.02:
            warnings.append(
                f"Coluna '{col}' possui muitos outliers ({count})"
            )

    return warnings

def calculate_quality_score(
    null_percentage,
    duplicate_rows,
    constant_columns,
    correlations,
    outliers,
    rows
):
    score = 100

    avg_null_percentage = float(null_percentage.mean())

    if avg_null_percentage > 0:
        score -= avg_null_percentage * 0.4

    duplicate_percentage = (duplicate_rows / rows) * 100

    score -= duplicate_percentage * 0.3

    score -= len(constant_columns) * 5

    
    high_correlations = [
        corr for corr in correlations
        if abs(corr["correlation"]) > 0.8
    ]

    score -= len(high_correlations) * 3

    high_outlier_columns = 0

    for count in outliers.values():
        outlier_percentage = (count / rows) * 100

        if outlier_percentage > 2:
            high_outlier_columns += 1

    score -= high_outlier_columns * 2
    
    score = max(0, min(100, round(score, 2)))

    if score >= 85:
        status = "good"
    elif score >= 60:
        status = "warning"
    else:
        status = "critical"

    return {
        "quality_score": score,
        "quality_status": status
    }
     

def analyze_dataset(file) -> dict:
    df = pd.read_csv(file, low_memory=False)

    numeric_cols = df.select_dtypes(include=np.number).columns

    basic_info = calculate_basic_info(df)

    null_percentage = calculate_null_percentage(df)

    duplicate_rows = int(df.duplicated().sum())

    constant_columns = find_constant_columns(df)

    numeric_stats = calculate_numeric_stats(df, numeric_cols)

    outliers = detect_outliers(df, numeric_cols)

    correlations = calculate_correlations(df, numeric_cols)

    warnings = generate_warnings(
        null_percentage,
        duplicate_rows,
        constant_columns,
        correlations,
        outliers,
        basic_info["rows"]
    )

    quality = calculate_quality_score(
        null_percentage,
        duplicate_rows,
        constant_columns,
        correlations,
        outliers,
        basic_info["rows"]
    )

    return {
        **basic_info,
        "quality": quality,
        "null_percentage": null_percentage.to_dict(),
        "duplicate_rows": duplicate_rows,
        "constant_columns": constant_columns,
        "numeric_stats": numeric_stats,
        "outliers": outliers,
        "correlations": correlations,
        "warnings": warnings
    }