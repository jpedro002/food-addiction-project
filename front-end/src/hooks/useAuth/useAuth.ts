import { AppDispatch, useAppSelector } from '@/store'
import { login, refreshSessionThunk } from '@/store/slices/authSlice'
import { useDispatch } from 'react-redux'

export const useAuth = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { token, session, loading } = useAppSelector((state) => state.auth)

	const singout = () => {
		localStorage.removeItem('token')
		dispatch(refreshSessionThunk())
	}

	return {
		token,
		session,
		loading,
		login: (payload: Parameters<typeof login>[0]) => dispatch(login(payload)),
		refreshSession: () => {
			dispatch(refreshSessionThunk())
		},
		singout,
	}
}
