import { useAppTitle } from '@/hooks/useAppTitle'
import { useAppSelector } from '@/store'
import { setLoadingState, startUsers } from '@/store/slices/appUsersSlice'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { IUseListUsers } from './ListUsers.types'

export const useListUsers = ({ usersService }: IUseListUsers) => {
	const [searchParams, _] = useSearchParams()

	const status = searchParams.get('status')
	const customerName = searchParams.get('customerName')

	useAppTitle({ title: 'Usuários' })

	const appUsers = useAppSelector((state) => state.appUsers.users)
	const loading = useAppSelector((state) => state.appUsers.isLoading)
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchUsers = async () => {
			dispatch(setLoadingState(true))
			try {
				const users = await usersService.list({
					customerName: customerName || '',
					status: status === 'all' ? undefined : status || '',
				})

				dispatch(startUsers(users))
			} catch (error) {
				console.error('Erro ao obter os usuários:', error)
				if (isAxiosError(error)) {
					toast.error(
						error.response?.data.message || 'Erro ao obter os usuários',
					)
				}
			} finally {
				dispatch(setLoadingState(false))
			}
		}

		fetchUsers()
	}, [customerName, status])
	return {
		appUsers,
		loading,
	}
}
