// Estatísticas básicas
export interface StatisticData {
	percentual: number
	quantidade: number
}

// Tabela de frequência de pontuações
export interface FrequencyTableItem {
	acumulado: number
	contagem: number
	percentual: number
}

// Distribuição de diagnósticos
export interface DiagnosticDistribution {
	Grave: StatisticData
	Leve: StatisticData
	Moderado: StatisticData
	'Sem adicção': StatisticData
}

// Informações de pacientes
export interface PatientInfo {
	Diagnostico: string
	ID_Paciente: string | null
	Origem: string
	Pontuacao: number
	Significado_Clinico: string
}

// Frequência de respostas
export interface QuestionFrequency {
	[questionKey: string]: {
		[value: string]: number
	}
}

// Mapa de calor
export interface HeatMapData {
	[questionKey: string]: {
		[value: string]: number
	}
}

// Percentual sintomático por questão
export interface SymptomaticPercentage {
	[questionKey: string]: number
}

// Tendências temporais
export interface TemporalTrends {
	[date: string]: {
		Grave: number
		Leve: number
		Moderado: number
		'Sem adicção': number
	}
}

// Relatório completo
export interface FoodAddictionReport {
	casos_de_atencao: StatisticData
	distribuicao_diagnosticos: DiagnosticDistribution
	frequencia_respostas: QuestionFrequency
	lista_pacientes: PatientInfo[]
	mapa_calor: HeatMapData
	pacientes: {
		'Rede Privada': StatisticData
		'Rede Pública': StatisticData
	}
	percentual_sintomatico: SymptomaticPercentage
	tabela_frequencia: {
		[score: string]: FrequencyTableItem
	}
	tendencias_temporais: TemporalTrends
	total_registros: number
}

export interface FoodAddictionReportResponse {
	data: FoodAddictionReport
}

// Formulário para criar resposta
export interface CreateFoodAddictionForm {
	userId: number
	q1: number
	q2: number
	q3: number
	q4: number
	q5: number
	q6: number
	q7: number
	q8: number
	q9: number
	q10: number
	q11: number
	q12: number
	q13: number
	origem: string
	identificadorPaciente: string
}

// Resposta da criação
export interface CreateFoodAddictionFormResponse {
	id: number
	userId: number
	// Outros campos que podem ser retornados
}
