import pandas as pd
from sqlalchemy import create_engine
from typing import Dict, Any
import calendar


def get_form_answers_df(engine):
    """Busca os dados da tabela form_answers e faz pré-processamento básico"""
    df = pd.read_sql("SELECT * FROM form_answers", engine)
    df.drop(columns=["id", "textAnswer"], inplace=True)
    df["createdAt"] = pd.to_datetime(df["createdAt"])
    return df


def get_total_patients_per_month(df: pd.DataFrame) -> pd.Series:
    """Retorna o número de pacientes únicos avaliados por mês"""
    df_copy = df.copy()
    df_copy.set_index("createdAt", inplace=True)
    monthly_patients = df_copy.resample("ME")["patientProfileId"].nunique()
    return monthly_patients.asfreq("ME", fill_value=0)


def get_records_count_per_month(df: pd.DataFrame) -> pd.Series:
    """Retorna o número total de registros por mês"""
    df_copy = df.copy()
    df_copy.set_index("createdAt", inplace=True)
    monthly_records = df_copy.resample("ME").size()
    return monthly_records.asfreq("ME", fill_value=0)


def get_patients_with_lpp_per_month(df: pd.DataFrame) -> pd.Series:
    """Retorna pacientes que tiveram algum registro <= 5 por mês"""
    df_copy = df.copy()
    df_copy.set_index("createdAt", inplace=True)
    lpp_df = df_copy[df_copy["numericAnswer"] <= 5]
    monthly_lpp = lpp_df.resample("ME")["patientProfileId"].nunique()
    return monthly_lpp.asfreq("ME", fill_value=0)


def get_patients_admitted_with_lpp_per_month(df: pd.DataFrame) -> pd.Series:
    """Retorna pacientes cuja primeira avaliação foi <= 5, agrupados por mês"""
    df_copy = df.copy()
    df_copy.reset_index(inplace=True)
    df_copy.sort_values(by="createdAt", inplace=True)
    first_responses = df_copy.groupby("patientProfileId").first().reset_index()
    lpp_first_responses = first_responses[first_responses["numericAnswer"] <= 5]
    lpp_first_responses.set_index("createdAt", inplace=True)
    monthly_lpp_first = lpp_first_responses.resample("ME").size()
    return monthly_lpp_first.asfreq("ME", fill_value=0)


def get_patients_deteriorated_per_month(df: pd.DataFrame) -> pd.Series:
    """Retorna pacientes inicialmente >= 9 que depois tiveram <= 5"""
    df_copy = df.copy()
    df_copy.sort_values(by="createdAt", inplace=True)
    first_records = df_copy.groupby("patientProfileId").first().reset_index()
    good_initial_condition = first_records[first_records["numericAnswer"] >= 9][
        "patientProfileId"
    ].tolist()

    deteriorated_patients = []
    for patient_id in good_initial_condition:
        patient_records = df_copy[df_copy["patientProfileId"] == patient_id]
        if len(patient_records) > 1:
            subsequent_records = patient_records.iloc[1:]
            if any(subsequent_records["numericAnswer"] <= 5):
                deteriorated_patients.append(patient_id)

    deteriorated_first_dates = first_records[
        first_records["patientProfileId"].isin(deteriorated_patients)
    ]
    deteriorated_first_dates.set_index("createdAt", inplace=True)
    monthly_deteriorated = deteriorated_first_dates.resample("ME").size()
    return monthly_deteriorated.asfreq("ME", fill_value=0)


def get_favorable_outcomes_per_month(df: pd.DataFrame) -> tuple:
    """Retorna pacientes cuja média >= primeiro registro e o total de pacientes"""
    df_copy = df.copy()
    df_copy.sort_values(by="createdAt", inplace=True)

    agg = (
        df_copy.groupby("patientProfileId")
        .agg({"numericAnswer": ["first", "mean"], "createdAt": "first"})
        .reset_index()
    )

    agg.columns = ["patientProfileId", "firstNumeric", "meanNumeric", "firstCreatedAt"]
    agg["favorable"] = agg["meanNumeric"] >= agg["firstNumeric"]

    agg.set_index("firstCreatedAt", inplace=True)
    agg.sort_index(inplace=True)

    monthly_favorable = agg.resample("ME")["favorable"].sum()
    monthly_total = agg.resample("ME")["favorable"].count()

    return monthly_favorable.asfreq("ME", fill_value=0), monthly_total.asfreq(
        "ME", fill_value=0
    )


def get_monthly_favorable_outcomes(df: pd.DataFrame) -> tuple:
    """
    Retorna desfechos favoráveis considerando apenas registros dentro do mesmo mês para cada paciente.
    Um desfecho é favorável quando a média das avaliações do paciente dentro do mês é >= à primeira avaliação do mês.

    Args:
        df: DataFrame contendo os registros de avaliação

    Returns:
        Tupla contendo (favoráveis por mês, total de pacientes por mês)
    """
    df_copy = df.copy()
    df_copy["year_month"] = df_copy["createdAt"].dt.to_period("M")

    # Inicializa DataFrames para armazenar resultados
    all_favorable = pd.DataFrame()
    all_counts = pd.DataFrame()

    # Para cada mês presente nos dados
    for period in df_copy["year_month"].unique():
        # Filtra registros apenas deste mês
        mask_month = df_copy["year_month"] == period
        df_month = df_copy[mask_month].copy()

        # Ordena cronologicamente
        df_month.sort_values(by="createdAt", inplace=True)

        # Agrupa por paciente para este mês específico
        month_agg = (
            df_month.groupby("patientProfileId")
            .agg({"numericAnswer": ["first", "mean"], "createdAt": "first"})
            .reset_index()
        )

        # Renomeia colunas
        month_agg.columns = [
            "patientProfileId",
            "firstNumeric",
            "meanNumeric",
            "firstCreatedAt",
        ]

        # Desfecho favorável = média >= primeiro registro do mês
        month_agg["favorable"] = month_agg["meanNumeric"] >= month_agg["firstNumeric"]

        # Usa a data do primeiro registro como índice
        month_agg.set_index("firstCreatedAt", inplace=True)

        # Adiciona ao DataFrame de resultados
        all_favorable = pd.concat([all_favorable, month_agg])

    # Agrupa resultados por mês
    all_favorable.sort_index(inplace=True)
    monthly_favorable = all_favorable.resample("ME")["favorable"].sum()
    monthly_total = all_favorable.resample("ME")["favorable"].count()

    return monthly_favorable.asfreq("ME", fill_value=0), monthly_total.asfreq(
        "ME", fill_value=0
    )


def format_date_key(date):
    """Formata a data no formato MM/YY"""
    return f"{date.month:02d}/{str(date.year)[-2:]}"


def generate_ulcer_report(start_date=None, end_date=None) -> Dict[str, Dict[str, Any]]:
    """
    Gera relatório de lesão por pressão no formato solicitado

    Args:
        start_date: Data inicial (opcional)
        end_date: Data final (opcional)

    Returns:
        Dicionário com os dados do relatório
    """
    # Conexão com o banco
    db_url = "postgresql+psycopg2://docker:docker@postgresql:5432/hospital-db"
    engine = create_engine(db_url)

    # Busca os dados uma única vez
    df = get_form_answers_df(engine)

    # Filtra por data, se necessário
    if start_date:
        df = df[df["createdAt"] >= pd.to_datetime(start_date)]
    if end_date:
        df = df[df["createdAt"] <= pd.to_datetime(end_date)]

    # Calcula as métricas
    total_patients = get_total_patients_per_month(df)
    total_records = get_records_count_per_month(df)
    patients_with_lpp = get_patients_with_lpp_per_month(df)
    patients_admitted_with_lpp = get_patients_admitted_with_lpp_per_month(df)
    patients_deteriorated = get_patients_deteriorated_per_month(df)
    favorable_outcomes, total_outcomes = get_favorable_outcomes_per_month(df)
    monthly_favorable, monthly_total = get_monthly_favorable_outcomes(df)

    # Calcula percentuais
    lpp_percentage = (patients_with_lpp / total_patients) * 100
    admitted_lpp_percentage = (patients_admitted_with_lpp / total_patients) * 100
    favorable_percentage = (favorable_outcomes / total_outcomes) * 100
    monthly_favorable_percentage = (monthly_favorable / monthly_total) * 100

    # Formata o resultado
    result = {}
    for date in total_patients.index:
        key = format_date_key(date)
        result[key] = {
            "nPacAvaliados": int(total_patients[date]),
            "quantRegistros": int(total_records[date]),
            "pacComLP": int(patients_with_lpp[date]),
            "percentPacComLP": round(lpp_percentage[date], 1),
            "nPacAdmComLP": int(patients_admitted_with_lpp[date]),
            "percentPacAdmComLP": round(admitted_lpp_percentage[date], 1),
            "nPacSemRiscoComLP": int(patients_deteriorated[date]),
            "nPacEvolMelhora": int(favorable_outcomes[date]),
            "percentDesfechosFavoraveis": round(favorable_percentage[date], 1),
            "nPacMelhoraMensal": (
                int(monthly_favorable[date])
                if pd.notna(monthly_favorable[date])
                else None
            ),
            "percentMelhoraMensal": (
                round(monthly_favorable_percentage[date], 1)
                if pd.notna(monthly_favorable_percentage[date])
                else None
            ),
        }

    return


# Exemplo de uso
if __name__ == "__main__":
    report = generate_ulcer_report()
    import json

    print(json.dumps(report, indent=2))
