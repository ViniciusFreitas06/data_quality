import pandas as pd


def detect_ml_targets(df):

    possible_targets = []

    for col in df.columns:

        series = df[col]

        # Ignora colunas totalmente nulas
        if series.isnull().all():
            continue

        # =========================
        # Classification
        # =========================

        if (
            series.nunique() <= 10
            and pd.api.types.is_numeric_dtype(series)
        ):

            possible_targets.append({
                "column": col,
                "problem_type": "classification",
                "unique_values": int(
                    series.nunique()
                )
            })

        # =========================
        # Regression
        # =========================

        elif pd.api.types.is_numeric_dtype(series):

            possible_targets.append({
                "column": col,
                "problem_type": "regression",
                "unique_values": int(
                    series.nunique()
                )
            })

    return possible_targets