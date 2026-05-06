import pandas as pd

df = pd.read_csv("student_placement_salary_elite_v2.csv")

null_percentage = (df.isnull().mean() * 100).round(2)

colunas_nulas = null_percentage[null_percentage > 10]

if len(colunas_nulas) > 0:
    print("Alta quantidade de valores nulos ")
    for coluna in colunas_nulas.items():
        print(coluna)

