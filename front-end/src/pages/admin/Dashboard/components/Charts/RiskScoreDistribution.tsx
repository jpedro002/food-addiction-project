'use client'

import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { useAppSelector } from '@/store'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export default function RiskScoreDistribution() {
	// Obter dados do relatório da Redux store
	const { report, loading, error } = useAppSelector((state) => state.foodReport)

	// Processar os dados de distribuição de pontuação para o formato do gráfico
	const data = useMemo(() => {
		if (!report) return []

		// Converter a tabela_frequencia (objeto) para um array de objetos com score e count
		return Object.entries(report.tabela_frequencia)
			.map(([score, dados]) => ({
				score: parseInt(score),
				count: dados.contagem,
				percentual: dados.percentual,
			}))
			.sort((a, b) => a.score - b.score)
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
				count: {
					label: 'Número de Pacientes',
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
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" vertical={false} />
				<XAxis
					dataKey="score"
					label={{
						value: 'Pontuação de Risco',
						position: 'insideBottom',
						offset: -5,
					}}
				/>
				<YAxis
					label={{
						value: 'Número de Pacientes',
						angle: -90,
						position: 'insideLeft',
					}}
				/>
				<ChartTooltip
					content={({ active, payload }) => {
						if (active && payload && payload.length) {
							const data = payload[0].payload
							return (
								<div className="rounded-lg border bg-background p-2 shadow-sm">
									<div className="grid grid-cols-2 gap-2">
										<div className="font-medium">Pontuação:</div>
										<div className="font-medium text-right">{data.score}</div>
										<div className="font-medium">Pacientes:</div>
										<div className="font-medium text-right">{data.count}</div>
										<div className="font-medium">Percentual:</div>
										<div className="font-medium text-right">
											{data.percentual}%
										</div>
									</div>
								</div>
							)
						}
						return null
					}}
				/>
				<Bar
					dataKey="count"
					name="Número de Pacientes"
					fill="var(--color-count)"
					radius={[4, 4, 0, 0]}
					barSize={30}
				/>
			</BarChart>
		</ChartContainer>
	)
}
