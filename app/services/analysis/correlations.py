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
