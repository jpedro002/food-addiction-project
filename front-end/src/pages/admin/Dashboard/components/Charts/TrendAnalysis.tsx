'use client'

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { useAppSelector } from '@/store'
import { useMemo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts'

export default function TrendAnalysis() {
	// Obter dados do relatório da Redux store
	const { report, loading, error } = useAppSelector((state) => state.foodReport)

	// Processar os dados de tendências temporais
	const data = useMemo(() => {
		if (!report || !report.tendencias_temporais) return []

		// Converter de objeto para array e formatar as datas
		return Object.entries(report.tendencias_temporais)
			.map(([date, values]) => {
				// Converter a data de "YYYY-MM" para "MMM/YY"
				const [year, month] = date.split('-')
				const monthNames = [
					'Jan',
					'Fev',
					'Mar',
					'Abr',
					'Mai',
					'Jun',
					'Jul',
					'Ago',
					'Set',
					'Out',
					'Nov',
					'Dez',
				]
				const monthIndex = parseInt(month) - 1
				const formattedDate = `${monthNames[monthIndex]}/${year.slice(2)}`

				// Mapear os valores para as propriedades esperadas pelo gráfico
				return {
					month: formattedDate,
					acentuada: values.Grave || 0,
					moderada: values.Moderado || 0,
					leve: values.Leve || 0,
					semAdicao: values['Sem adicção'] || 0,
				}
			})
			.sort((a, b) => {
				// Convertendo as strings para números
				const yearA = parseInt(a.month.split('/')[1]) + 2000 // Assumindo anos como "23" para 2023
				const yearB = parseInt(b.month.split('/')[1]) + 2000

				const dateA = new Date(yearA, monthToIndex(a.month.split('/')[0]))
				const dateB = new Date(yearB, monthToIndex(b.month.split('/')[0]))

				return dateA.getTime() - dateB.getTime()
			})
	}, [report])

	// Função auxiliar para converter nome do mês para índice
	function monthToIndex(monthName: string): number {
		const months = {
			Jan: 0,
			Fev: 1,
			Mar: 2,
			Abr: 3,
			Mai: 4,
			Jun: 5,
			Jul: 6,
			Ago: 7,
			Set: 8,
			Out: 9,
			Nov: 10,
			Dez: 11,
		}
		return months[monthName as keyof typeof months] || 0
	}

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
				acentuada: {
					label: 'Adicção Grave',
					color: '#ef4444',
				},
				moderada: {
					label: 'Adicção Moderada',
					color: '#f97316',
				},
				leve: {
					label: 'Adicção Leve',
					color: '#eab308',
				},
				semAdicao: {
					label: 'Sem Adcição',
					color: '#10b981',
				},
			}}
			className="h-full"
		>
			<LineChart
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="month" />
				<YAxis />
				<ChartTooltip content={<ChartTooltipContent />} />
				<Legend />
				<Line
					type="monotone"
					dataKey="acentuada"
					stroke="var(--color-acentuada)"
					activeDot={{ r: 8 }}
				/>
				<Line
					type="monotone"
					dataKey="moderada"
					stroke="var(--color-moderada)"
				/>
				<Line type="monotone" dataKey="leve" stroke="var(--color-leve)" />
				<Line
					type="monotone"
					dataKey="semAdicao"
					stroke="var(--color-semAdicao)"
				/>
			</LineChart>
		</ChartContainer>
	)
}
