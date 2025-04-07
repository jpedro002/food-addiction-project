import pandas as pd
from sqlalchemy import create_engine
from typing import Dict, Any
import os
import numpy as np


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


def get_missing_records_days_per_month(df: pd.DataFrame) -> pd.DataFrame:
    """
    Calcula a média de dias sem registro por paciente para cada mês.

    Args:
        df: DataFrame com os dados de registros de pacientes

    Returns:
        DataFrame indexado por mês/ano contendo a análise de dias sem registro
    """
    # Converter a coluna createdAt para datetime se ainda não estiver nesse formato
    df = df.copy()
    df["createdAt"] = pd.to_datetime(df["createdAt"])

    # Adicionar colunas de mês e ano para agrupar
    df["mes_ano"] = df["createdAt"].dt.strftime("%m/%y")
    df["mes"] = df["createdAt"].dt.month
    df["ano"] = df["createdAt"].dt.year
    df["data"] = df["createdAt"].dt.date

    # Análise por mês
    analise_mensal = []

    # Obter lista de meses únicos nos dados
    meses_unicos = (
        df[["mes", "ano", "mes_ano"]].drop_duplicates().sort_values(["ano", "mes"])
    )

    # Para cada mês
    for _, row in meses_unicos.iterrows():
        mes = row["mes"]
        ano = row["ano"]
        mes_ano = row["mes_ano"]

        # Filtrar dados do mês atual
        df_mes = df[(df["mes"] == mes) & (df["ano"] == ano)]

        # Para cada paciente, calcular dias totais e dias com registro
        dias_sem_registro_pacientes = []

        for patient_id, patient_data in df_mes.groupby("patientProfileId"):
            # Primeiro e último registro do paciente no mês
            primeiro_dia = patient_data["data"].min()
            ultimo_dia = patient_data["data"].max()

            # Total de dias entre primeiro e último (inclusive)
            dias_totais = (ultimo_dia - primeiro_dia).days + 1

            # Dias com registro
            dias_com_registro = patient_data["data"].nunique()

            # Dias sem registro
            dias_sem_registro = dias_totais - dias_com_registro

            dias_sem_registro_pacientes.append(dias_sem_registro)

        # Calcular as métricas mensais
        qtd_pacientes = len(dias_sem_registro_pacientes)
        media_dias_sem_registro = (
            np.mean(dias_sem_registro_pacientes) if qtd_pacientes > 0 else 0
        )

        # Guardar resultados
        analise_mensal.append(
            {
                "mes_ano": mes_ano,
                "qtd_pacientes": qtd_pacientes,
                "media_dias_com_registro": round(
                    df_mes.groupby("patientProfileId")["data"].nunique().mean(), 1
                ),
                "media_dias_sem_registro": round(media_dias_sem_registro, 1),
                "total_registros": len(df_mes),
            }
        )

    # Converter para DataFrame e retornar
    if analise_mensal:
        resultado_mensal = pd.DataFrame(analise_mensal)
        resultado_mensal = resultado_mensal.set_index("mes_ano")
        return resultado_mensal
    else:
        # Retornar DataFrame vazio com as colunas esperadas
        return pd.DataFrame(
            columns=[
                "qtd_pacientes",
                "media_dias_com_registro",
                "media_dias_sem_registro",
                "total_registros",
            ]
        )


def get_lpp_improvement_per_month(df: pd.DataFrame) -> tuple:
    """
    Retorna a quantidade de pacientes que tiveram LPP (numericAnswer <= 5)
    e cujo último registro foi superior à sua pior avaliação, agrupados por mês.

    Args:
        df: DataFrame com os registros de avaliação

    Returns:
        Tupla contendo (pacientes com melhora por mês, total de pacientes com LPP por mês)
    """
    df_copy = df.copy()

    # Certificar que createdAt está em formato datetime
    if not pd.api.types.is_datetime64_any_dtype(df_copy["createdAt"]):
        df_copy["createdAt"] = pd.to_datetime(df_copy["createdAt"])

    # Identificar pacientes que tiveram LPP (numericAnswer <= 5)
    lpp_patients = df_copy[df_copy["numericAnswer"] <= 5]["patientProfileId"].unique()

    # Lista para armazenar dados de evolução
    evolution_data = []

    # Para cada paciente com LPP
    for patient_id in lpp_patients:
        # Filtrar dados deste paciente
        patient_data = df_copy[df_copy["patientProfileId"] == patient_id]

        # Verificar o valor mais baixo de numericAnswer (pior estado)
        lowest_score = patient_data["numericAnswer"].min()
        lowest_score_record = (
            patient_data[patient_data["numericAnswer"] == lowest_score]
            .sort_values("createdAt")
            .iloc[0]
        )
        lowest_score_date = lowest_score_record["createdAt"]

        # Verificar a última resposta
        last_record = patient_data.sort_values("createdAt").iloc[-1]
        last_response = last_record["numericAnswer"]
        last_response_date = last_record["createdAt"]

        # Calcular a evolução (diferença entre o último valor e o valor mais baixo)
        evolution = last_response - lowest_score

        # Armazenar os dados
        evolution_data.append(
            {
                "patientProfileId": patient_id,
                "lowest_score": lowest_score,
                "lowest_score_date": lowest_score_date,
                "last_response": last_response,
                "last_response_date": last_response_date,
                "evolution": evolution,
                "improved": evolution
                > 0,  # Paciente melhorou se último valor > pior valor
            }
        )

    # Criar DataFrame com os dados de evolução
    evolution_df = pd.DataFrame(evolution_data)

    # Se não houver dados, retornar séries vazias
    if evolution_df.empty:
        # MODIFICAÇÃO: Usar 'M' em vez de 'ME'
        empty_series = pd.Series(dtype=int).asfreq("M", fill_value=0)
        return empty_series, empty_series

    # Converter datas para período mensal para agrupamento
    evolution_df["month"] = pd.to_datetime(
        evolution_df["last_response_date"]
    ).dt.to_period("M")

    # Agrupar por mês
    monthly_improved = evolution_df[evolution_df["improved"]].groupby("month").size()
    monthly_total = evolution_df.groupby("month").size()

    # MODIFICAÇÃO: Usar 'M' em vez de 'ME' para compatibilidade com o período
    monthly_improved = monthly_improved.asfreq("M", fill_value=0)
    monthly_total = monthly_total.asfreq("M", fill_value=0)

    return monthly_improved, monthly_total


def generate_ulcer_report(start_date=None, end_date=None) -> Dict[str, Dict[str, Any]]:
    """
    Gera relatório de lesão por pressão no formato solicitado

    Args:
        start_date: Data inicial (opcional)
        end_date: Data final (opcional)

    Returns:
        Dicionário com os dados do relatório
    """
    try:
        # Conexão com o banco
        db_url = db_url = (
            os.getenv("DB_URL")
            or "postgresql+psycopg2://docker:docker@postgresql:5432/hospital-db"
        )
        engine = create_engine(db_url)

        # Busca os dados uma única vez
        df = get_form_answers_df(engine)

        print("DataFrame original:", df.head(30))

        # Filtra por data, se necessário
        if start_date:
            df = df[df["createdAt"] >= pd.to_datetime(start_date)]
        if end_date:
            df = df[df["createdAt"] <= pd.to_datetime(end_date)]
        # else:
        #     # Se não houver data final, use a data atual como limite
        #     df = df[df["createdAt"] <= pd.Timestamp.now()]

        # Verifica se há dados após a filtragem
        if df.empty:
            return {}

        # Calcula as métricas
        total_patients = get_total_patients_per_month(df)
        total_records = get_records_count_per_month(df)
        patients_with_lpp = get_patients_with_lpp_per_month(df)
        patients_admitted_with_lpp = get_patients_admitted_with_lpp_per_month(df)
        patients_deteriorated = get_patients_deteriorated_per_month(df)
        favorable_outcomes, total_outcomes = get_favorable_outcomes_per_month(df)
        monthly_favorable, monthly_total = get_monthly_favorable_outcomes(df)
        dias_sem_registro_df = get_missing_records_days_per_month(df)
        lpp_improved, lpp_total = get_lpp_improvement_per_month(df)

        # Calcula percentuais com tratamento seguro para divisão por zero
        lpp_percentage = patients_with_lpp.divide(total_patients, fill_value=0) * 100
        admitted_lpp_percentage = (
            patients_admitted_with_lpp.divide(total_patients, fill_value=0) * 100
        )
        favorable_percentage = (
            favorable_outcomes.divide(total_outcomes, fill_value=0) * 100
        )
        monthly_favorable_percentage = (
            monthly_favorable.divide(monthly_total, fill_value=0) * 100
        )

        lpp_improved_percentage = lpp_improved.divide(lpp_total, fill_value=0) * 100

        all_dates = total_patients.index

        # Adicione log para depuração
        print(f"Datas disponíveis: {all_dates}")

        # Formata o resultado
        result = {}
        for date in all_dates:
            key = format_date_key(date)

            mes_ano_key = key  # Formato já está como MM/YY
            media_dias_sem_registro = 0.0
            if mes_ano_key in dias_sem_registro_df.index:
                media_dias_sem_registro = float(
                    dias_sem_registro_df.loc[mes_ano_key, "media_dias_sem_registro"]
                )

            result[key] = {
                "nPacAvaliados": (
                    int(total_patients.get(date, 0))
                    if date in total_patients.index
                    else 0
                ),
                "quantRegistros": (
                    int(total_records.get(date, 0))
                    if date in total_records.index
                    else 0
                ),
                "pacComLP": (
                    int(patients_with_lpp.get(date, 0))
                    if date in patients_with_lpp.index
                    else 0
                ),
                "percentPacComLP": (
                    round(float(lpp_percentage.get(date, 0)), 1)
                    if date in lpp_percentage.index
                    else 0.0
                ),
                "nPacAdmComLP": (
                    int(patients_admitted_with_lpp.get(date, 0))
                    if date in patients_admitted_with_lpp.index
                    else 0
                ),
                "percentPacAdmComLP": (
                    round(float(admitted_lpp_percentage.get(date, 0)), 1)
                    if date in admitted_lpp_percentage.index
                    else 0.0
                ),
                "nPacSemRiscoComLP": (
                    int(patients_deteriorated.get(date, 0))
                    if date in patients_deteriorated.index
                    else 0
                ),
                "nPacMelhoraMensal": (
                    int(monthly_favorable.get(date, 0))
                    if date in monthly_favorable.index
                    else 0
                ),
                "percentMelhoraMensal": (
                    round(float(monthly_favorable_percentage.get(date, 0)), 1)
                    if date in monthly_favorable_percentage.index
                    else 0.0
                ),
                "mediaDiasSemRegistro": round(media_dias_sem_registro, 1),
                "nPacComLPPMelhora": (
                    int(lpp_improved.get(date, 0)) if date in lpp_improved.index else 0
                ),
                "percentPacComLPPMelhora": (
                    round(float(lpp_improved_percentage.get(date, 0)), 1)
                    if date in lpp_improved_percentage.index
                    else 0.0
                ),
            }

        # Adicione log do resultado antes de retornar

        print(f"Resultado gerado: {result}")
        return result

    except Exception as e:
        print(f"Erro ao gerar relatório de úlcera: {e}")
        import traceback

        traceback.print_exc()  # Imprime o stack trace completo
        return {}


# Exemplo de uso
if __name__ == "__main__":
    report = generate_ulcer_report()
    import json

    print(json.dumps(report, indent=2))
