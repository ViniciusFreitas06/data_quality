
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
