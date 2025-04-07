import { defaultRouteToRole } from '@/services/session/types'
import { useAppSelector } from '@/store'
import { Link } from 'react-router-dom'

export function NotFound() {
	const userRole = useAppSelector((state) => state.auth.session?.role)

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl font-bold">Página não encontrada</h1>
			<p className="text-accent-foreground">
				Voltar para o
				<Link
					to={defaultRouteToRole[userRole || 'NOT_LOGGED']}
					className="text-sky-600 dark:text-sky-400"
				>
					Dashboard
				</Link>
			</p>
		</div>
	)
}
