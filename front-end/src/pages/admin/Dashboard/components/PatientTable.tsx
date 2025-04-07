'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useAppSelector } from '@/store'
import { Eye } from 'lucide-react'

export default function PatientTable() {
	// Obter dados dos pacientes do Redux store
	const { report, loading, error } = useAppSelector((state) => state.foodReport)

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
	if (
		!report ||
		!report.lista_pacientes ||
		report.lista_pacientes.length === 0
	) {
		return (
			<div className="flex h-40 items-center justify-center rounded-md border">
				Nenhum dado de paciente disponível
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
					{report.lista_pacientes.map((patient, index) => (
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
