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
     
