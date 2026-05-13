import numpy as np

def detect_outliers(df, numeric_cols):
    statistical_outliers = {}

    for col in numeric_cols:
        series = df[col].dropna()

        if series.std() == 0:
            continue

        z_scores = (series - series.mean()) / series.std()

        statistical_outliers[col] = int((np.abs(z_scores) > 3).sum())

    return statistical_outliers

