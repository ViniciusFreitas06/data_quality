def calculate_basic_info(df):
    rows, columns = df.shape

    return {
        "rows": rows,
        "columns": columns,
        "column_names": list(df.columns)
    }