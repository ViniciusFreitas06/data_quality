import pandas as pd
import numpy as np

def analyze_dataset(file) -> dict:
    df = pd.read_csv(file)

    rows, columns = df.shape

    null_percentage = (df.isnull().mean() * 100).round(2)

    null_columns = null_percentage[null_percentage > 10]

    duplicate_rows = int(df.duplicated().sum())

    constant_columns = [col for col in df.columns if df[col].nunique() <= 1]

    numeric_cols = df.select_dtypes(include=np.number).columns

    stats = {}
    for col in numeric_cols:
        stats[col] = {
            "mean": float(df[col].mean()),
            "std": float(df[col].std()),
            "min": float(df[col].min()),
            "max": float(df[col].max())
        }

    outliers = {}
    for col in numeric_cols:
        series = df[col].dropna()
        if series.std() == 0:
            continue

        z_scores = (series - series.mean()) / series.std()
        outliers[col] = int((np.abs(z_scores) > 3).sum())

    correlations = []
    if len(numeric_cols) > 1:
        corr_matrix = df[numeric_cols].corr()

        for i in range(len(corr_matrix.columns)):
            for j in range(i):
                val = corr_matrix.iloc[i, j]
                if abs(val) > 0.8:
                    correlations.append({
                        "col1": corr_matrix.columns[i],
                        "col2": corr_matrix.columns[j],
                        "correlation": round(float(val), 2)
                    })

    warnings = []

    if len(null_columns) > 0:
        for x, y in null_columns.items():
            warnings.append(f"Coluna com alto índice de nulo {x, y}")

    if duplicate_rows > 0:
        warnings.append("Dataset possui duplicatas")

    if len(constant_columns) > 0:
        warnings.append("Existem colunas sem variação")

    if len(correlations) > 0:
        warnings.append("Possíveis colunas redundantes (alta correlação)")

    return {
        "rows": rows,
        "columns": columns,
        "column_names": list(df.columns),
        "null_percentage": null_percentage.to_dict(),
        "duplicate_rows": duplicate_rows,
        "constant_columns": constant_columns,
        "numeric_stats": stats,
        "outliers": outliers,
        "correlations": correlations,
        "warnings": warnings
    }