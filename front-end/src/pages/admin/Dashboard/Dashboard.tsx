'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAppTitle } from '@/hooks/useAppTitle'
import { foodAddictionService } from '@/services/formAddictionFood'
import { useAppSelector } from '@/store'
import {
	fetchReportFailure,
	fetchReportStart,
	fetchReportSuccess,
	setCurrentDiagnostic,
	setCurrentQuestion,
} from '@/store/slices/foodAddictionSlice'
import {
	AlertCircle,
	BarChart3,
	FileText,
	TrendingUp,
	Users,
} from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DashboardSkeleton from './DashboardSkeleton'
import FrequencyHeatmap from './components/Charts/FrequencyHeatmap'
import PatientDistributionChart from './components/Charts/PatientDistributionChart'
import QuestionAnalysisChart from './components/Charts/QuestionAnalysisChart'
import ResponseFrequencyChart from './components/Charts/ResponseFrequencyChart'
import RiskScoreDistribution from './components/Charts/RiskScoreDistribution'
import TrendAnalysis from './components/Charts/TrendAnalysis'
import PatientTable from './components/PatientTable'

export default function Dashboard() {
	const dispatch = useDispatch()
	const { report, loading, error, currentQuestion, currentDiagnostic } =
		useAppSelector((state) => state.foodReport)

	useAppTitle({
		title: 'Dashboard',
	})

	const fetchReport = async () => {
		dispatch(fetchReportStart())

		try {
			const response = await foodAddictionService.getFoodAddictionReport()
			dispatch(fetchReportSuccess(response.data))
		} catch (error) {
			console.error('Erro ao buscar relatório:', error)
			const errorMessage =
				error instanceof Error ? error.message : 'Erro ao buscar relatório'
			dispatch(fetchReportFailure(errorMessage))
		}
	}

	useEffect(() => {
		fetchReport()
	}, [dispatch])

	if (loading) {
		return <DashboardSkeleton />
	}

	if (error) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4">
				<Badge variant="destructive">{error}</Badge>
				<Button onClick={fetchReport}>Tentar novamente</Button>
			</div>
		)
	}

	if (!report) {
		return (
			<div className="flex h-full items-center justify-center">
				<Badge variant="outline">Nenhum dado disponível</Badge>
			</div>
		)
	}

	const {
		Grave,
		Moderado,
		Leve,
		'Sem adicção': SemAdicao,
	} = report.distribuicao_diagnosticos
	const percentAdicaoAcentuada = Grave.percentual
	const percentAdicaoModerada = Moderado.percentual
	const percentAdicaoLeve = Leve.percentual
	const percentSemAdicao = SemAdicao.percentual

	return (
		<div className="flex flex-col gap-4 p-4 md:p-8">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold tracking-tight text-emerald-700">
					Escala de Yale
				</h1>
				<p className="text-muted-foreground">
					Dashboard de análise de comportamento alimentar baseado na Escala de
					adicção Alimentar de Yale
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total de Registros
						</CardTitle>
						<FileText className="h-4 w-4 text-emerald-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{report.total_registros}</div>
						<p className="text-xs text-muted-foreground">Entradas no sistema</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pacientes Únicos
						</CardTitle>
						<Users className="h-4 w-4 text-emerald-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{report.lista_pacientes.length}
						</div>
						<p className="text-xs text-muted-foreground">
							{report.pacientes['Rede Pública'].quantidade} públicos,{' '}
							{report.pacientes['Rede Privada'].quantidade} privados
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Casos de Atenção
						</CardTitle>
						<AlertCircle className="h-4 w-4 text-red-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{report.casos_de_atencao.quantidade}
						</div>
						<p className="text-xs text-muted-foreground">
							Pacientes que requerem acompanhamento
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Tendência de adicção
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-emerald-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{(percentAdicaoAcentuada + percentAdicaoModerada).toFixed(1)}%
						</div>
						<p className="text-xs text-muted-foreground">
							Pacientes com adicção moderada ou acentuada
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-7">
				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Distribuição de Diagnósticos</CardTitle>
						<CardDescription>
							Classificação dos pacientes por nível de adicção
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center gap-2">
										<span className="h-3 w-3 rounded-full bg-red-500"></span>
										<span>adicção Acentuada</span>
									</div>
									<span className="font-medium">{Grave.quantidade}</span>
								</div>
								<Progress
									value={percentAdicaoAcentuada}
									className="h-2 bg-muted"
								/>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center gap-2">
										<span className="h-3 w-3 rounded-full bg-orange-500"></span>
										<span>adicção Moderada</span>
									</div>
									<span className="font-medium">{Moderado.quantidade}</span>
								</div>
								<Progress
									value={percentAdicaoModerada}
									className="h-2 bg-muted"
								/>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center gap-2">
										<span className="h-3 w-3 rounded-full bg-yellow-500"></span>
										<span>adicção Leve</span>
									</div>
									<span className="font-medium">{Leve.quantidade}</span>
								</div>
								<Progress value={percentAdicaoLeve} className="h-2 bg-muted" />
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center gap-2">
										<span className="h-3 w-3 rounded-full bg-green-500"></span>
										<span>Sem adicção</span>
									</div>
									<span className="font-medium">{SemAdicao.quantidade}</span>
								</div>
								<Progress value={percentSemAdicao} className="h-2 bg-muted" />
							</div>
						</div>

						<div className="mt-6">
							<PatientDistributionChart />
						</div>
					</CardContent>
				</Card>

				<Card className="md:col-span-5">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<div>
								<CardTitle>Análise de Respostas</CardTitle>
								<CardDescription>
									Frequência de respostas por pergunta
								</CardDescription>
							</div>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button variant="outline" size="icon">
											<BarChart3 className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Alternar visualização</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</CardHeader>
					<CardContent className="p-0">
						<Tabs defaultValue="heatmap" className="h-full">
							<div className="px-6 pt-2">
								<TabsList className="mb-4">
									<TabsTrigger value="heatmap">Mapa de Calor</TabsTrigger>
									<TabsTrigger value="frequency">Frequência</TabsTrigger>
									<TabsTrigger value="questions">Perguntas</TabsTrigger>
								</TabsList>
							</div>
							<ScrollArea className="h-[450px] px-6 pb-4">
								<TabsContent value="heatmap" className="m-0 h-[430px]">
									<FrequencyHeatmap />
								</TabsContent>
								<TabsContent value="frequency" className="m-0 h-[430px]">
									<div className="space-y-4">
										<div className="flex justify-start m-2">
											<Select
												defaultValue={report ? currentQuestion : 'q1'}
												onValueChange={(value) =>
													dispatch(setCurrentQuestion(value))
												}
											>
												<SelectTrigger className="w-[280px]">
													<SelectValue placeholder="Selecione a pergunta para análise" />
												</SelectTrigger>
												<SelectContent align="end">
													<SelectItem value="q1">
														Q1: Comer até sentir-se doente
													</SelectItem>
													<SelectItem value="q2">
														Q2: Sentir-se lento após comer
													</SelectItem>
													<SelectItem value="q3">
														Q3: Evitar atividades por medo
													</SelectItem>
													<SelectItem value="q4">
														Q4: Comer para aliviar problemas
													</SelectItem>
													<SelectItem value="q5">
														Q5: Sofrimento por comportamento
													</SelectItem>
													<SelectItem value="q6">
														Q6: Problemas significativos
													</SelectItem>
													<SelectItem value="q7">
														Q7: Prejuízo em tarefas domésticas
													</SelectItem>
													<SelectItem value="q8">
														Q8: Continuar comendo apesar dos problemas
													</SelectItem>
													<SelectItem value="q9">
														Q9: Diminuição do prazer ao comer
													</SelectItem>
													<SelectItem value="q10">
														Q10: Impulsos fortes para comer
													</SelectItem>
													<SelectItem value="q11">
														Q11: Tentativas falhas de reduzir
													</SelectItem>
													<SelectItem value="q12">
														Q12: Distração durante a ingestão
													</SelectItem>
													<SelectItem value="q13">
														Q13: Preocupação de amigos/família
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="h-[380px]">
											<ResponseFrequencyChart />
										</div>
									</div>
								</TabsContent>
								<TabsContent value="questions" className="m-0 h-[430px]">
									<QuestionAnalysisChart />
								</TabsContent>
							</ScrollArea>
						</Tabs>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Distribuição de Pontuação de Risco</CardTitle>
						<CardDescription>
							Pontuação total dos pacientes na escala
						</CardDescription>
					</CardHeader>
					<CardContent className="h-[300px]">
						<RiskScoreDistribution />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Análise de Tendências</CardTitle>
						<CardDescription>
							Evolução dos casos ao longo do tempo
						</CardDescription>
					</CardHeader>
					<CardContent className="h-[300px]">
						<TrendAnalysis />
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Detalhes dos Pacientes</CardTitle>
							<CardDescription>
								Informações detalhadas por paciente
							</CardDescription>
						</div>
						<Select
							value={currentDiagnostic}
							onValueChange={(value) => dispatch(setCurrentDiagnostic(value))}
						>
							<SelectTrigger className="w-[200px]">
								<SelectValue placeholder="Filtrar por diagnóstico" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos os diagnósticos</SelectItem>
								<SelectItem value="severe">Adicção Grave</SelectItem>
								<SelectItem value="moderate">Adicção Moderada</SelectItem>
								<SelectItem value="mild">Adicção Leve</SelectItem>
								<SelectItem value="none">Sem Adicção</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardHeader>
				<CardContent>
					<PatientTable />
				</CardContent>
			</Card>
		</div>
	)
}
