'use client'

import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { useAppSelector } from '@/store'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export default function QuestionAnalysisChart() {
	// Obter dados do relatório da Redux store
	const { report, loading, error } = useAppSelector((state) => state.foodReport)

	// Descrições das perguntas para melhorar a visualização
	const questionDescriptions = [
		{ name: 'q1', description: 'Comer até sentir-se doente' },
		{ name: 'q2', description: 'Sentir-se lento após comer' },
		{ name: 'q3', description: 'Evitar atividades por medo' },
		{ name: 'q4', description: 'Comer para aliviar problemas' },
		{ name: 'q5', description: 'Sofrimento por comportamento' },
		{ name: 'q6', description: 'Problemas significativos' },
		{ name: 'q7', description: 'Prejuízo em tarefas domésticas' },
		{ name: 'q8', description: 'Continuar comendo apesar dos problemas' },
		{ name: 'q9', description: 'Diminuição do prazer ao comer' },
		{ name: 'q10', description: 'Impulsos fortes para comer' },
		{ name: 'q11', description: 'Tentativas falhas de reduzir' },
		{ name: 'q12', description: 'Distração durante a ingestão' },
		{ name: 'q13', description: 'Preocupação de amigos/família' },
	]

	// Processar os dados do relatório para o formato do gráfico
	const data = useMemo(() => {
		if (!report) return []

		return questionDescriptions.map(({ name, description }) => {
			// Calcular a porcentagem de respostas positivas (não-zero)
			const questionData = report.percentual_sintomatico[name]

			return {
				name: name.toUpperCase(),
				description,
				value: parseFloat(questionData.toFixed(1)),
			}
		})
	}, [report])

	// Se estiver carregando, mostrar mensagem
	if (loading) {
		return (
			<div className="flex h-full items-center justify-center">
				Carregando...
			</div>
		)
	}

	// Se ocorrer um erro, mostrar mensagem
	if (error) {
		return (
			<div className="flex h-full items-center justify-center">
				Erro ao carregar dados: {error}
			</div>
		)
	}

	// Se não tiver dados, mostrar mensagem
	if (!report || data.length === 0) {
		return (
			<div className="flex h-full items-center justify-center">
				Sem dados disponíveis
			</div>
		)
	}

	return (
		<ChartContainer
			config={{
				responses: {
					label: 'Respostas Positivas',
					color: '#3b82f6',
				},
			}}
			className="h-full"
		>
			<BarChart
				layout="vertical"
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 120,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" horizontal={false} />
				<XAxis
					type="number"
					domain={[0, 100]}
					tickFormatter={(value) => `${value}%`}
				/>
				<YAxis
					dataKey="name"
					type="category"
					tick={{ fontSize: 12 }}
					tickFormatter={(value, index) =>
						`${value}: ${data[index].description.substring(0, 15)}...`
					}
				/>
				<ChartTooltip
					content={({ active, payload }) => {
						if (active && payload && payload.length) {
							const data = payload[0].payload
							return (
								<div className="rounded-lg border bg-background p-2 shadow-sm">
									<div className="grid grid-cols-2 gap-2">
										<div className="font-medium">{data.name}</div>
										<div className="font-medium text-right">{data.value}%</div>
									</div>
									<div className="text-xs text-muted-foreground">
										{data.description}
									</div>
								</div>
							)
						}
						return null
					}}
				/>
				<Bar
					dataKey="value"
					name="Respostas Positivas"
					fill="var(--color-responses)"
				/>
			</BarChart>
		</ChartContainer>
	)
}
