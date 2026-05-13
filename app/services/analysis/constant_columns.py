def find_constant_columns(df):
    return [col for col in df.columns if df[col].nunique() <= 1]
