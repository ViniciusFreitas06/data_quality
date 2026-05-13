import numpy as np

from sklearn.ensemble import IsolationForest


def detect_ml_outliers(df, numeric_cols):

    clean_df = df[numeric_cols].dropna()

    if clean_df.empty:
        return {
            "total_anomalies": 0,
            "anomaly_percentage": 0,
            "anomaly_indexes": [],
            "suspicious_columns": [],
            "anomaly_samples": []
        }

    # =========================
    # Train Model
    # =========================

    model = IsolationForest(
        contamination=0.02,
        random_state=42
    )

    predictions = model.fit_predict(clean_df)

    # =========================
    # Basic Metrics
    # =========================

    anomalies = int(
        (predictions == -1).sum()
    )

    anomaly_percentage = float(
        round(
            (anomalies / len(clean_df)) * 100,
            2
        )
    )

    # =========================
    # Split Normal / Anomaly
    # =========================

    anomaly_df = clean_df[
        predictions == -1
    ]

    normal_df = clean_df[
        predictions == 1
    ]

    # =========================
    # Anomaly Indexes
    # =========================

    anomaly_indexes = [
        int(idx)
        for idx in anomaly_df.index
    ]

    # =========================
    # Suspicious Columns
    # =========================

    suspicious_columns = []

    for col in numeric_cols:

        normal_mean = normal_df[col].mean()

        anomaly_mean = anomaly_df[col].mean()

        difference = abs(
            anomaly_mean - normal_mean
        )

        suspicious_columns.append({
            "column": str(col),

            "difference": round(
                float(difference),
                2
            )
        })

    suspicious_columns = sorted(
        suspicious_columns,
        key=lambda x: x["difference"],
        reverse=True
    )

    # =========================
    # Anomaly Samples
    # =========================

    anomaly_samples = (
        anomaly_df
        .head(10)
        .astype(object)
        .replace({np.nan: None})
        .to_dict(orient="records")
    )

    # =========================
    # Final Response
    # =========================

    return {

        "total_anomalies":
            anomalies,

        "anomaly_percentage":
            anomaly_percentage,

        "anomaly_indexes":
            anomaly_indexes[:20],

        "suspicious_columns":
            suspicious_columns[:5],

        "anomaly_samples":
            anomaly_samples
    }