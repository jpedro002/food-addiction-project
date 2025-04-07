import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { selfUpdatePasswordSchema } from './TabPassword.schema'
import {
	ISelfUpdatePasswordSchema,
	IUseTabPasswordProps,
} from './TabPassword.types'

export const useTabPassword = ({
	handleCloseModal,
	usersService,
}: IUseTabPasswordProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
	} = useForm<ISelfUpdatePasswordSchema>({
		resolver: zodResolver(selfUpdatePasswordSchema),
	})

	const onSubmit = async ({
		currentPassword,
		newPassword,
	}: ISelfUpdatePasswordSchema) => {
		try {
			const { message } = await usersService.selfUpdatePassword({
				oldPassword: currentPassword,
				newPassword,
			})

			toast.success(message)
			handleCloseModal()
		} catch (error) {
			console.error(error)
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message || 'Erro ao atualizar conta')

				if (error.response?.data.message === 'Senha antiga incorreta') {
					setFocus('currentPassword')
				}
			}
		}
	}

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
	}
}
