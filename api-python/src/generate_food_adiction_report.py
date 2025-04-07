import pandas as pd
from sqlalchemy import create_engine
import os


def obter_dados(db_url=None, query=None, df=None):
    """
    Obtém os dados do banco de dados ou usa um DataFrame fornecido.
    """
    if df is not None:
        return df

    if db_url and query:
        engine = create_engine(db_url)
        df = pd.read_sql(query, engine)
        return df

    raise ValueError(
        "É necessário fornecer um DataFrame ou uma URL de banco de dados e uma query"
    )


def calcular_sintomas(df):
    """
    Calcula a contagem de sintomas por paciente e classifica a severidade.
    Retorna o dataframe atualizado e informações sobre a classificação.
    """
    perguntas = [
        "q1",
        "q2",
        "q3",
        "q4",
        "q5",
        "q6",
        "q7",
        "q8",
        "q9",
        "q10",
        "q11",
        "q12",
        "q13",
    ]

    # Definir os valores numéricos que representam sintomas
    frequencias_sintomas_padrao = [
        5,
        6,
        7,
    ]  # 2-3 vezes por semana, 4-6 vezes por semana, Todos os dias

    # Itens específicos onde "Uma vez por semana" (valor 4) também conta como sintoma
    itens_especiais = ["q1", "q2", "q4", "q9", "q10", "q11"]

    def contar_sintomas_row(row):
        count = 0
        for pergunta in perguntas:
            if pergunta in itens_especiais:
                # Para itens especiais, "Uma vez por semana" (4) também é considerado sintoma
                if row[pergunta] in frequencias_sintomas_padrao or row[pergunta] == 4:
                    count += 1
            else:
                # Para os demais itens, apenas frequências mais altas são consideradas sintomas
                if row[pergunta] in frequencias_sintomas_padrao:
                    count += 1
        return count

    # Aplicar a função e criar uma nova coluna com a contagem de sintomas
    df["Total_Sintomas"] = df.apply(contar_sintomas_row, axis=1)

    # Classificar a severidade
    def classificar_severidade(sintomas):
        if sintomas <= 1:
            return "Sem adicção"
        elif 2 <= sintomas <= 3:
            return "Leve"
        elif 4 <= sintomas <= 5:
            return "Moderado"
        elif sintomas >= 6:
            return "Grave"

    df["Severidade"] = df["Total_Sintomas"].apply(classificar_severidade)

    return df, perguntas, itens_especiais, frequencias_sintomas_padrao


def calcular_distribuicao_origem(df):
    """
    Calcula a distribuição de pacientes por origem.
    """
    df["origem"] = df["origem"].fillna("N/A")

    # Total de registros
    total_registros = len(df)

    # Contagem por origem do paciente
    contagem_por_origem = df.groupby("origem").size().to_dict()

    # Percentual por origem
    percentual_por_origem = (
        (df.groupby("origem").size() / total_registros * 100).round(2).to_dict()
    )

    # Criar dicionário de pacientes por origem
    pacientes_por_origem = {}
    for origem, count in contagem_por_origem.items():
        pacientes_por_origem[origem] = {
            "quantidade": count,
            "percentual": percentual_por_origem[origem],
        }

    # Cruzamento de severidade com origem
    tabela_cruzada = (
        pd.crosstab(df["origem"], df["Severidade"], normalize="index") * 100
    )
    severidade_por_origem = {}

    for origem in tabela_cruzada.index:
        severidade_por_origem[origem] = tabela_cruzada.loc[origem].round(2).to_dict()

    return pacientes_por_origem, severidade_por_origem


def calcular_tendencias_temporais(df):
    """
    Calcula tendências de severidade ao longo do tempo.
    """
    # Garantir que a coluna de data é do tipo datetime
    df["createdAt"] = pd.to_datetime(df["createdAt"])

    # Criar coluna de mês/ano para agrupamento
    df["mes_ano"] = df["createdAt"].dt.strftime("%Y-%m")

    # Criar tabela cruzada de severidade por mês-ano
    tabela_tempo = pd.crosstab(df["mes_ano"], df["Severidade"])

    # Garantir que todos os meses entre o primeiro e o último registro apareçam
    primeiro_mes = df["createdAt"].min().strftime("%Y-%m")
    ultimo_mes = df["createdAt"].max().strftime("%Y-%m")

    # Criar um intervalo completo de meses
    todos_meses = (
        pd.date_range(start=primeiro_mes, end=ultimo_mes, freq="MS")
        .strftime("%Y-%m")
        .tolist()
    )

    # Reindexar para incluir todos os meses e preencher com zeros
    tabela_tempo_completa = tabela_tempo.reindex(todos_meses, fill_value=0)

    # Filtrar meses sem dados
    tabela_filtrada = tabela_tempo_completa.loc[tabela_tempo_completa.sum(axis=1) > 0]

    # Converter para um formato mais fácil de usar
    resultado = {}
    for mes in tabela_filtrada.index:
        resultado[mes] = tabela_filtrada.loc[mes].to_dict()

    return resultado


def calcular_frequencia_respostas(df, perguntas):
    """
    Calcula a frequência de respostas para cada questão.
    """
    # Definir as possíveis respostas
    respostas = [0, 1, 2, 3, 4, 5, 6, 7]

    # Criar dicionário para armazenar as frequências
    freq_respostas = {}

    # Calcular frequências para cada pergunta
    for pergunta in perguntas:
        # Contagem de cada resposta
        contagem = df[pergunta].value_counts().to_dict()

        # Preencher valores que não aparecem com 0
        for resposta in respostas:
            if resposta not in contagem:
                contagem[resposta] = 0

        freq_respostas[pergunta] = contagem

    return freq_respostas


def calcular_percentual_respostas(df, perguntas):
    """
    Calcula o percentual de respostas para cada questão.
    """
    # Definir as possíveis respostas
    respostas = [0, 1, 2, 3, 4, 5, 6, 7]

    # Criar matriz para armazenar os percentuais
    matriz_percentual = {}

    # Calcular percentuais para cada pergunta
    for pergunta in perguntas:
        total_respostas = len(df[pergunta])
        distribuicao = df[pergunta].value_counts(normalize=True) * 100

        # Criar dicionário para esta pergunta
        matriz_percentual[pergunta] = {}

        # Preencher com os percentuais (colocando 0 onde não há respostas)
        for resposta in respostas:
            if resposta in distribuicao:
                matriz_percentual[pergunta][resposta] = round(distribuicao[resposta], 1)
            else:
                matriz_percentual[pergunta][resposta] = 0.0

    return matriz_percentual


def calcular_percentual_sintomatico(df, perguntas, itens_especiais, matriz_percentual):
    """
    Calcula o percentual sintomático por pergunta.
    """
    percentual_sintomatico = {}

    for pergunta in perguntas:
        # Definir quais respostas são consideradas sintomáticas para esta pergunta
        if pergunta in itens_especiais:
            # Para perguntas especiais, "Uma vez por semana" também conta
            indices_sintomaticos = [4, 5, 6, 7]
        else:
            # Para as demais perguntas
            indices_sintomaticos = [5, 6, 7]

        # Somar os percentuais das respostas sintomáticas
        percentual = sum(
            matriz_percentual[pergunta][resp] for resp in indices_sintomaticos
        )

        # Armazenar o resultado
        percentual_sintomatico[pergunta] = round(percentual, 1)

    # Ordenar do maior para o menor percentual
    return dict(
        sorted(percentual_sintomatico.items(), key=lambda x: x[1], reverse=True)
    )


def preparar_lista_pacientes(df):
    """
    Prepara uma lista detalhada de pacientes.
    """
    # Mapear severidade para significado clínico
    mapa_significado = {
        "Sem adicção": "Sem indicação de adicção alimentar",
        "Leve": "Indicação de adicção alimentar leve",
        "Moderado": "Indicação de adicção alimentar moderada",
        "Grave": "Indicação de adicção alimentar grave",
    }

    # Preparar lista de pacientes
    lista_pacientes = []
    for _, row in df.iterrows():
        paciente = {
            "ID_Paciente": row.get("identificador_paciente", "N/A"),
            "Origem": row.get("origem", "N/A"),
            "Diagnostico": row.get("Severidade", "N/A"),
            "Significado_Clinico": mapa_significado.get(
                row.get("Severidade", "N/A"), "N/A"
            ),
            "Pontuacao": int(row.get("Total_Sintomas", 0)),
        }
        lista_pacientes.append(paciente)

    return lista_pacientes


def calcular_mapa_calor_respostas(df, perguntas):
    """
    Calcula um mapa de calor baseado na distribuição percentual de respostas para cada questão.
    """
    # Definir as possíveis respostas
    respostas = [0, 1, 2, 3, 4, 5, 6, 7]

    # Criar DataFrame para armazenar os percentuais
    matriz_percentual = pd.DataFrame(index=perguntas, columns=respostas)

    # Calcular percentuais para cada pergunta
    for pergunta in perguntas:
        total_respostas = len(df[pergunta])
        distribuicao = df[pergunta].value_counts(normalize=True) * 100

        # Preencher matriz com os percentuais (colocando 0 onde não há respostas)
        for resposta in respostas:
            if resposta in distribuicao:
                matriz_percentual.loc[pergunta, resposta] = distribuicao[resposta]
            else:
                matriz_percentual.loc[pergunta, resposta] = 0

    # Substituir os nomes longos das perguntas por versões mais curtas para melhor visualização
    nomes_curtos = [f"Q{i+1}" for i in range(len(perguntas))]
    matriz_percentual.index = nomes_curtos

    # Arredondar para uma casa decimal para melhor visualização
    matriz_formatada = matriz_percentual.round(1)

    # Converter para formato de dicionário adequado para visualização
    resultado = {}
    for pergunta in matriz_formatada.index:
        resultado[pergunta] = matriz_formatada.loc[pergunta].to_dict()

    return resultado


def calcular_tabela_frequencia(df):
    """
    Calcula uma tabela de frequência detalhada para os totais de sintomas.

    Args:
        df: DataFrame contendo a coluna 'Total_Sintomas'

    Returns:
        dict: Dicionário com informações da tabela de frequência
    """
    # Obter contagem de sintomas e ordenar por índice
    contagem_sintomas = df["Total_Sintomas"].value_counts().sort_index()

    # Calcular percentuais
    percentual_sintomas = (
        df["Total_Sintomas"].value_counts(normalize=True).sort_index() * 100
    )

    # Calcular percentuais acumulados
    percentual_acumulado = percentual_sintomas.cumsum()

    # Criar dicionário com os dados
    resultado = {}
    for valor in contagem_sintomas.index:
        resultado[str(valor)] = {
            "contagem": int(contagem_sintomas[valor]),
            "percentual": round(float(percentual_sintomas[valor]), 2),
            "acumulado": round(float(percentual_acumulado[valor]), 2),
        }

    return resultado


def generate_food_addiction_report(df=None, db_url=None, query=None):
    """
    Função principal que gera o relatório completo de adicção alimentar.

    Parâmetros:
    df (pandas.DataFrame, opcional): DataFrame com os dados. Se não fornecido, os dados serão obtidos do banco de dados.
    db_url (str, opcional): URL de conexão com o banco de dados.
    query (str, opcional): Query SQL para obter os dados.

    Retorna:
    dict: Dicionário com todas as informações do relatório.
    """
    # Obter dados

    db_url = (
        os.getenv("DB_URL")
        or "postgresql+psycopg2://docker:docker@postgresql:5432/food-adction"
    )
    query = "SELECT * FROM form_food_addiction_answers WHERE origem = 'Rede Pública' or origem = 'Rede Privada'"

    df = obter_dados(db_url, query, df)

    # Calcular sintomas e classificar severidade
    df, perguntas, itens_especiais, frequencias_sintomas_padrao = calcular_sintomas(df)

    # Calcular distribuição por origem
    pacientes_por_origem, severidade_por_origem = calcular_distribuicao_origem(df)

    # Calcular tendências temporais (mapa de calor)
    tendencias_temporais = calcular_tendencias_temporais(df)

    # Calcular frequência de respostas
    freq_respostas = calcular_frequencia_respostas(df, perguntas)

    # Calcular percentual de respostas
    matriz_percentual = calcular_percentual_respostas(df, perguntas)

    # Calcular percentual sintomático
    percentual_sintomatico = calcular_percentual_sintomatico(
        df, perguntas, itens_especiais, matriz_percentual
    )

    # Preparar lista de pacientes
    lista_pacientes = preparar_lista_pacientes(df)

    mapa_calor = calcular_mapa_calor_respostas(df, perguntas)

    tabela_frequencia = calcular_tabela_frequencia(df)

    # Calcular casos de atenção (pacientes graves e moderados)
    casos_graves = df[df["Severidade"] == "Grave"].shape[0]
    casos_moderados = df[df["Severidade"] == "Moderado"].shape[0]
    total_casos_atencao = casos_graves + casos_moderados
    percentual_casos_atencao = round((total_casos_atencao / len(df) * 100), 2)

    # Calcular distribuição dos diagnósticos
    distribuicao_diagnosticos = {}
    for severidade, count in df["Severidade"].value_counts().to_dict().items():
        distribuicao_diagnosticos[severidade] = {
            "quantidade": count,
            "percentual": round((count / len(df) * 100), 2),
        }

    # Montar relatório final
    relatorio = {
        "total_registros": len(df),
        "pacientes": pacientes_por_origem,
        "casos_de_atencao": {
            "quantidade": total_casos_atencao,
            "percentual": percentual_casos_atencao,
        },
        "mapa_calor": mapa_calor,
        "distribuicao_diagnosticos": distribuicao_diagnosticos,
        "tendencias_temporais": tendencias_temporais,
        "frequencia_respostas": freq_respostas,
        "percentual_sintomatico": percentual_sintomatico,
        "lista_pacientes": lista_pacientes,
        "tabela_frequencia": tabela_frequencia,
    }

    return relatorio


if __name__ == "__main__":
    # Exemplo de uso

    relatorio = generate_food_addiction_report()
    print(relatorio)
