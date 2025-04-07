import { Button } from '@/components/ui/button/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useAppSelector } from '@/store'
import { PieChartIcon } from 'lucide-react'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'

export default function PatientDistributionChart() {
	// Obter dados do relatório da Redux store
	const { report } = useAppSelector((state) => state.foodReport)
	const pacientes = report?.pacientes

	// Componente de visualização do gráfico
	const ChartComponent = () => {
		// Se não houver dados disponíveis, mostrar um placeholder
		if (!pacientes) {
			return (
				<div className="h-[180px] w-full flex items-center justify-center">
					Sem dados disponíveis
				</div>
			)
		}

		// Transformar os dados do relatório para o formato esperado pelo gráfico
		const data = [
			{
				name: 'Rede Pública',
				value: pacientes['Rede Pública'].quantidade,
				color: '#10b981',
			},
			{
				name: 'Rede Privada',
				value: pacientes['Rede Privada'].quantidade,
				color: '#3b82f6',
			},
		]

		return (
			<div className="h-[300px] w-full ">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={60}
							outerRadius={120}
							paddingAngle={2}
							dataKey="value"
							labelLine={false}
							label={({ name, percent }) =>
								`${name}: ${(percent * 100).toFixed(0)}%`
							}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							formatter={(value) => [`${value} pacientes`, 'Quantidade']}
							contentStyle={{
								borderRadius: '8px',
								padding: '8px',
								border: '1px solid #e2e8f0',
							}}
						/>
						<Legend
							layout="horizontal"
							verticalAlign="bottom"
							align="center"
							wrapperStyle={{ paddingTop: '20px' }}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		)
	}

	// Versão resumida para exibição no dashboard
	const PreviewChart = () => {
		if (!pacientes) {
			return (
				<div className="h-[180px] w-full flex items-center justify-center">
					Sem dados disponíveis
				</div>
			)
		}

		const data = [
			{
				name: 'Rede Pública',
				value: pacientes['Rede Pública'].quantidade,
				color: '#10b981',
			},
			{
				name: 'Rede Privada',
				value: pacientes['Rede Privada'].quantidade,
				color: '#3b82f6',
			},
		]

		return (
			<div className="h-[200px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={40}
							outerRadius={80}
							paddingAngle={2}
							dataKey="value"
							labelLine={false}
						>
							{data.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Legend
							layout="horizontal"
							verticalAlign="bottom"
							align="center"
							wrapperStyle={{ paddingTop: '10px' }}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		)
	}

	return (
		<Dialog>
			<div className="flex flex-col">
				<PreviewChart />
				<DialogTrigger asChild>
					<Button variant="outline" size="sm" className="mt-2 self-center">
						<PieChartIcon className="h-4 w-4 mr-2" />
						Ver detalhes
					</Button>
				</DialogTrigger>
			</div>

			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Distribuição de Pacientes</DialogTitle>
					<DialogDescription>
						Distribuição entre pacientes da rede pública e privada
					</DialogDescription>
				</DialogHeader>
				<ChartComponent />
				<div className="mt-4">
					<p className="text-sm text-muted-foreground">
						Total de pacientes: {report ? report.lista_pacientes.length : 0}
					</p>
					<p className="text-sm text-muted-foreground">
						Rede Pública: {pacientes ? pacientes['Rede Pública'].quantidade : 0}{' '}
						({pacientes ? pacientes['Rede Pública'].percentual.toFixed(1) : 0}
						%)
					</p>
					<p className="text-sm text-muted-foreground">
						Rede Privada: {pacientes ? pacientes['Rede Privada'].quantidade : 0}{' '}
						({pacientes ? pacientes['Rede Privada'].percentual.toFixed(1) : 0}
						%)
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}
