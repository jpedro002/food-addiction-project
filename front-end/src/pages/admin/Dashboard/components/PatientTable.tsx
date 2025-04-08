'use client'

import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useAppSelector } from '@/store'
import { useMemo } from 'react'

export default function PatientTable() {
	// Obter dados dos pacientes e o filtro atual do Redux store
	const { report, loading, error, currentDiagnostic } = useAppSelector(
		(state) => state.foodReport,
	)

	// Filtrar pacientes com base no diagnóstico selecionado
	const filteredPatients = useMemo(() => {
		if (!report || !report.lista_pacientes) return []

		// Se o filtro for 'all', retornar todos os pacientes
		if (currentDiagnostic === 'all') {
			return report.lista_pacientes
		}

		// Mapeamento dos valores do Select para os diagnósticos reais
		const diagnosticMapping: Record<string, string> = {
			severe: 'Grave',
			moderate: 'Moderado',
			mild: 'Leve',
			none: 'Sem adicção',
		}

		// Filtrar pacientes pelo diagnóstico
		return report.lista_pacientes.filter(
			(patient) => patient.Diagnostico === diagnosticMapping[currentDiagnostic],
		)
	}, [report, currentDiagnostic])

	// Função para renderizar o badge de diagnóstico com as cores corretas
	const getDiagnosisBadge = (diagnosis: string) => {
		switch (diagnosis) {
			case 'Grave':
				return <Badge className="bg-red-500 hover:bg-red-600">Grave</Badge>
			case 'Moderado':
				return (
					<Badge className="bg-orange-500 hover:bg-orange-600">Moderado</Badge>
				)
			case 'Leve':
				return <Badge className="bg-yellow-500 hover:bg-yellow-600">Leve</Badge>
			default:
				return (
					<Badge className="bg-green-500 hover:bg-green-600">Sem adicção</Badge>
				)
		}
	}

	// Função para determinar a classe CSS com base na pontuação
	const getScoreClass = (score: number) => {
		if (score >= 6) return 'text-red-500 font-bold'
		if (score >= 4) return 'text-orange-500 font-bold'
		if (score >= 2) return 'text-yellow-500 font-bold'
		return 'text-green-500 font-bold'
	}

	// Exibir estado de carregamento
	if (loading) {
		return (
			<div className="flex h-40 items-center justify-center rounded-md border">
				Carregando dados dos pacientes...
			</div>
		)
	}

	// Exibir mensagem de erro
	if (error) {
		return (
			<div className="flex h-40 items-center justify-center rounded-md border">
				Erro ao carregar dados: {error}
			</div>
		)
	}

	// Verificar se há dados disponíveis
	if (!filteredPatients || filteredPatients.length === 0) {
		return (
			<div className="flex h-40 items-center justify-center rounded-md border">
				Nenhum paciente encontrado com o filtro selecionado
			</div>
		)
	}

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID Paciente</TableHead>
						<TableHead>Origem</TableHead>
						<TableHead>Diagnóstico</TableHead>
						<TableHead>Significado Clínico</TableHead>
						<TableHead>Pontuação</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredPatients.map((patient, index) => (
						<TableRow key={`${patient.ID_Paciente || 'sem-id'}-${index}`}>
							<TableCell className="font-medium">
								{patient.ID_Paciente || 'N/A'}
							</TableCell>
							<TableCell>
								<Badge
									variant="outline"
									className={
										patient.Origem === 'Rede Pública'
											? 'border-emerald-500 text-emerald-500'
											: 'border-blue-500 text-blue-500'
									}
								>
									{patient.Origem}
								</Badge>
							</TableCell>
							<TableCell>{getDiagnosisBadge(patient.Diagnostico)}</TableCell>
							<TableCell>{patient.Significado_Clinico}</TableCell>
							<TableCell className={getScoreClass(patient.Pontuacao)}>
								{patient.Pontuacao}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
