'use client'

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { useAppSelector } from '@/store'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export default function ResponseFrequencyChart() {
	// Obter dados do relatório e a pergunta atual da Redux store
	const { report, currentQuestion } = useAppSelector(
		(state) => state.foodReport,
	)

	// Mapeamento dos valores para as labels de frequência
	const frequencyLabels = [
		'Nunca',
		'Menos que mensalmente',
		'Uma vez por mês',
		'2-3 vezes por mês',
		'Uma vez por semana',
		'2-3 vezes por semana',
		'4-6 vezes por semana',
		'Todos os dias',
	]

	// Processar os dados de frequência para o gráfico
	const getData = () => {
		if (!report) return []

		const questionData = report.frequencia_respostas[currentQuestion]
		if (!questionData) return []

		return frequencyLabels.map((name, index) => ({
			name,
			value: questionData[index.toString()] || 0,
		}))
	}

	const data = getData()

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
				frequency: {
					label: 'Frequência',
					color: '#3b82f6',
				},
			}}
			className="h-full"
		>
			<BarChart
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 60,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" vertical={false} />
				<XAxis
					dataKey="name"
					angle={-45}
					textAnchor="end"
					height={60}
					tick={{ fontSize: 12 }}
				/>
				<YAxis
					label={{
						value: 'Porcentagem (%)',
						angle: -90,
						position: 'insideLeft',
					}}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="value" name="Frequência" fill="var(--color-frequency)" />
			</BarChart>
		</ChartContainer>
	)
}
