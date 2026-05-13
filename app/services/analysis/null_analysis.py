def calculate_null_percentage(df):
    return (df.isnull().mean() * 100).round(2)
