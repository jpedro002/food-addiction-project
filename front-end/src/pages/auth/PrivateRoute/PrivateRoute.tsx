import { SpinnerLoading } from '@/components/SpinnerLoading'
import { useAuth } from '@/hooks/useAuth/useAuth'
import { defaultRouteToRole } from '@/services/session/types'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
	allowedRoles: string[]
	children: ReactNode
}

export const PrivateRoute = ({ allowedRoles, children }: PrivateRouteProps) => {
	const { token, session, loading } = useAuth()

	if (loading) {
		return (
			<div className="h-screen grid place-items-center">
				<SpinnerLoading className="size-8" />
			</div>
		)
	}

	if (allowedRoles.includes('NOT_LOGGED')) {
		if (!token) {
			return <>{children}</>
		}
	}

	if (!token || !session) {
		return <Navigate to="/auth" replace />
	}
	const hasPermission = allowedRoles.includes(session.role)

	if (!hasPermission) {
		return <Navigate to={defaultRouteToRole[session.role]} replace />
	}

	return <>{children}</>
}
