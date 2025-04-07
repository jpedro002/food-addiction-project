import { useAuth } from '@/hooks/useAuth/useAuth'
import { useAppSelector } from '@/store'

export const useDropDownUserSettings = () => {
	const user = useAppSelector((state) => state.auth.session)

	const { singout } = useAuth()

	return {
		user,
		onLogout: singout,
	}
}
