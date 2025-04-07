import { useAuth } from '@/hooks/useAuth/useAuth'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export const SessionProvider = () => {
	const { refreshSession, session, token } = useAuth()

	useEffect(() => {
		if (token && !session) {
			refreshSession()
		}
	}, [])

	return <Outlet />
}
