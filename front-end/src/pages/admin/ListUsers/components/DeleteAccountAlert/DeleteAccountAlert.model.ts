import { deleteUserFromStore } from '@/store/slices/appUsersSlice'
import { isAxiosError } from 'axios'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { IUseDeleteAccountAlert } from './DeleteAccountAlert.types'

export const useDeleteAccountAlert = ({
	userID,
	usersService,
}: IUseDeleteAccountAlert) => {
	const dispatch = useDispatch()

	const handleDeleteUser = async () => {
		try {
			await usersService.delete(userID)
			dispatch(deleteUserFromStore(userID))
			toast.success('Usuário excluído com sucesso')
		} catch (error) {
			console.error(error)

			if (isAxiosError(error)) {
				toast.error(error.response?.data.message || 'Erro ao excluir usuário')
			}
		}
	}

	return {
		handleDeleteUser,
	}
}
