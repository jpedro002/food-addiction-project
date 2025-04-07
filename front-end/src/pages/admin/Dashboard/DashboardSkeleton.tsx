import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DashboardSkeleton() {
	return (
		<div className="flex flex-col gap-4 p-4 md:p-8">
			{/* Header */}
			<div className="flex flex-col gap-2">
				<Skeleton className="h-9 w-64" />
				<Skeleton className="h-5 w-96" />
			</div>

			{/* Stat Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{Array(4)
					.fill(0)
					.map((_, i) => (
						<Card key={`stat-${i}`}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									<Skeleton className="h-4 w-32" />
								</CardTitle>
								<Skeleton className="h-4 w-4 rounded-full" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-7 w-16 mb-1" />
								<Skeleton className="h-4 w-24" />
							</CardContent>
						</Card>
					))}
			</div>

			{/* Main Content Grid */}
			<div className="grid gap-4 md:grid-cols-7">
				{/* Diagnósticos Card */}
				<Card className="md:col-span-2">
					<CardHeader>
						<Skeleton className="h-6 w-48 mb-1" />
						<Skeleton className="h-4 w-64" />
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{Array(4)
								.fill(0)
								.map((_, i) => (
									<div key={`diag-${i}`} className="space-y-2">
										<div className="flex items-center justify-between text-sm">
											<div className="flex items-center gap-2">
												<Skeleton className="h-3 w-3 rounded-full" />
												<Skeleton className="h-4 w-28" />
											</div>
											<Skeleton className="h-4 w-6" />
										</div>
										<Skeleton className="h-2 w-full" />
									</div>
								))}
						</div>

						<div className="mt-6 flex justify-center">
							<Skeleton className="h-9 w-48" />
						</div>
					</CardContent>
				</Card>

				{/* Análise de Respostas Card */}
				<Card className="md:col-span-5">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between">
							<div>
								<Skeleton className="h-6 w-40 mb-1" />
								<Skeleton className="h-4 w-56" />
							</div>
							<Skeleton className="h-9 w-9" />
						</div>
					</CardHeader>
					<CardContent className="p-0">
						<div className="px-6 pt-2">
							{/* Adiciona o componente Tabs envolvendo TabsList */}
							<Tabs defaultValue="heatmap">
								<TabsList className="mb-4">
									<TabsTrigger value="heatmap" disabled>
										<Skeleton className="h-4 w-24" />
									</TabsTrigger>
									<TabsTrigger value="frequency" disabled>
										<Skeleton className="h-4 w-24" />
									</TabsTrigger>
									<TabsTrigger value="questions" disabled>
										<Skeleton className="h-4 w-24" />
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
						<div className="px-6 pb-4">
							<Skeleton className="h-[450px] w-full" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Grid */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-64 mb-1" />
						<Skeleton className="h-4 w-48" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-[300px] w-full" />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<Skeleton className="h-6 w-48 mb-1" />
						<Skeleton className="h-4 w-64" />
					</CardHeader>
					<CardContent>
						<Skeleton className="h-[300px] w-full" />
					</CardContent>
				</Card>
			</div>

			{/* Patient Table */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<Skeleton className="h-6 w-40 mb-1" />
							<Skeleton className="h-4 w-56" />
						</div>
						<Skeleton className="h-9 w-[180px]" />
					</div>
				</CardHeader>
				<CardContent>
					<div className="rounded-md border">
						<div className="border-b p-4">
							<div className="flex justify-between">
								{Array(6)
									.fill(0)
									.map((_, i) => (
										<Skeleton key={`th-${i}`} className="h-5 w-24" />
									))}
							</div>
						</div>
						<div>
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<div key={`tr-${i}`} className="border-b p-4">
										<div className="flex justify-between">
											{Array(6)
												.fill(0)
												.map((_, j) => (
													<Skeleton key={`td-${i}-${j}`} className="h-5 w-24" />
												))}
										</div>
									</div>
								))}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
