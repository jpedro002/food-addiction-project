import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAppSelector } from '@/store'
import { Fragment } from 'react/jsx-runtime'

export default function FrequencyHeatmap() {
	// Obter dados do relatório da Redux store
	const { report } = useAppSelector((state) => state.foodReport)

	// Definição das perguntas para exibição com textos descritivos
	const questions = [
		'Q1: Comer até sentir-se doente',
		'Q2: Sentir-se lento após comer',
		'Q3: Evitar atividades por medo',
		'Q4: Comer para aliviar problemas',
		'Q5: Sofrimento por comportamento',
		'Q6: Problemas significativos',
		'Q7: Prejuízo em tarefas domésticas',
		'Q8: Continuar comendo apesar dos problemas',
		'Q9: Diminuição do prazer ao comer',
		'Q10: Impulsos fortes para comer',
		'Q11: Tentativas falhas de reduzir',
		'Q12: Distração durante a ingestão',
		'Q13: Preocupação de amigos/família',
	]

	const frequencies = [
		'Nunca',
		'Menos que mensalmente',
		'Uma vez por mês',
		'2-3 vezes por mês',
		'Uma vez por semana',
		'2-3 vezes por semana',
		'4-6 vezes por semana',
		'Todos os dias',
	]

	// Função para gerar matriz de dados do mapa de calor a partir dos dados reais
	const generateHeatmapData = () => {
		if (!report) return Array(13).fill(Array(8).fill(0))

		const heatmapData = []

		for (let i = 1; i <= 13; i++) {
			const questionKey = `Q${i}`
			const questionData = report.mapa_calor[questionKey]

			if (questionData) {
				const rowData = Array(8)
					.fill(0)
					.map((_, index) => {
						// Valores de frequência nos dados reais são de 0 a 7
						const value = questionData[index.toString()] || 0
						// Arredondar para um decimal para exibição mais limpa
						return parseFloat(value.toFixed(1))
					})
				heatmapData.push(rowData)
			} else {
				heatmapData.push(Array(8).fill(0))
			}
		}

		return heatmapData
	}

	const heatmapData = generateHeatmapData()

	const getColorIntensity = (value: number) => {
		// Escala de cores de verde (baixo) para vermelho (alto)
		if (value < 10) return 'bg-emerald-50'
		if (value < 20) return 'bg-emerald-100'
		if (value < 30) return 'bg-emerald-200'
		if (value < 40) return 'bg-yellow-100'
		if (value < 50) return 'bg-yellow-200'
		if (value < 60) return 'bg-orange-200'
		if (value < 70) return 'bg-orange-300'
		if (value < 80) return 'bg-red-200'
		if (value < 90) return 'bg-red-300'
		return 'bg-red-400'
	}

	// Se não houver dados, exibir mensagem
	if (!report) {
		return <div className="p-4 text-center">Dados não disponíveis</div>
	}

	return (
		<div className="overflow-x-auto">
			<div className="min-w-[800px]">
				<div className="grid grid-cols-[200px_repeat(8,1fr)]">
					{/* Cabeçalho */}
					<div className="p-2 font-medium text-center">
						Perguntas / Frequência
					</div>
					{frequencies.map((freq, index) => (
						<TooltipProvider key={index}>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="p-2 text-xs text-center font-medium border-b cursor-help">
										{freq.length > 10 ? `${freq.substring(0, 10)}...` : freq}
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>{freq}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					))}

					{/* Linhas de dados */}
					{questions.map((question, qIndex) => (
						<Fragment key={`q-${qIndex}`}>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="p-2 text-xs border-r cursor-help">
											{question.length > 25
												? `${question.substring(0, 25)}...`
												: question}
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>{question}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							{frequencies.map((_, fIndex) => (
								<TooltipProvider key={`cell-${qIndex}-${fIndex}`}>
									<Tooltip>
										<TooltipTrigger asChild>
											<div
												className={`p-2 text-center text-xs font-medium border ${getColorIntensity(heatmapData[qIndex][fIndex])} cursor-help`}
											>
												{heatmapData[qIndex][fIndex]}%
											</div>
										</TooltipTrigger>
										<TooltipContent>
											<p>{question}</p>
											<p>
												{frequencies[fIndex]}: {heatmapData[qIndex][fIndex]}%
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							))}
						</Fragment>
					))}
				</div>
			</div>
		</div>
	)
}
