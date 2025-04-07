import { useAuth } from '@/hooks/useAuth/useAuth'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export const LogOut = () => {
	const { singout } = useAuth()

	useEffect(() => {
		singout()
	}, [])

	return <Navigate to="/auth" />
}
