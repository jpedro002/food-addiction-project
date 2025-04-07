import { ROLES_ARRAY } from '@/services/session/types'
import { useAppSelector } from '@/store'
import { updateUser } from '@/store/slices/appUsersSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { updateUserSchema } from '../CreateAccountModal/CreateAccountModal.schema'
import {
	IUpdateUserSchema,
	IUseUpdateAccountModal,
} from './UpdateAccountModal.types'

export const useUpdateAccountModal = ({
	usersService,
	defaultValues,
	userID,
}: IUseUpdateAccountModal) => {
	const [isOpen, setIsOpen] = useState(false)

	const loading = useAppSelector((state) => state.appUsers.isLoading)

	const dispatch = useDispatch()

	const ROLES = ROLES_ARRAY

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<IUpdateUserSchema>({
		resolver: zodResolver(updateUserSchema),
		defaultValues,
	})

	const onSubmit = async (data: IUpdateUserSchema) => {
		try {
			const response = await usersService.update(userID, data)

			dispatch(
				updateUser({
					id: userID,
					email: response.email,
					name: response.name,
					role: response.role,
				}),
			)
			toast.success('Usuário atualizado com sucesso')
			setIsOpen(false)
		} catch (error) {
			console.error(error)
			if (isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao atualizar usuário')
			}
		}
	}

	const onResetPassword = async () => {
		try {
			await usersService.resetPassword(userID)

			toast.success('Senha resetada com sucesso')
			setIsOpen(false)
		} catch (error) {
			console.error(error)
			if (isAxiosError(error) && error.response) {
				toast.error(error.response.data.message || 'Erro ao resetar senha')
			}
		}
	}

	return {
		isOpen,
		setIsOpen,
		loading,
		register,
		control,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
		ROLES,
		onResetPassword,
	}
}
