import { useAppSelector } from '@/store'
import { updateEmailAndName } from '@/store/slices/authSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { EmailAndNameSchema } from './TabAccount.schema'
import { IEmailAndNameSchema, IuseTabAccountProps } from './TabAccount.type'

export const useTabAccount = ({
	handleCloseModal,
	usersService,
}: IuseTabAccountProps) => {
	const userData = useAppSelector((state) => state.auth.session)
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IEmailAndNameSchema>({
		resolver: zodResolver(EmailAndNameSchema),
		defaultValues: {
			name: userData?.name || '',
			email: userData?.email || '',
		},
	})

	const onSubmit = async (data: IEmailAndNameSchema) => {
		try {
			await usersService.selfUpdateEmailAndName(data)
			dispatch(updateEmailAndName(data))
			toast.success('Conta atualizada com sucesso')
			handleCloseModal()
		} catch (error) {
			console.error(error)
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message || 'Erro ao atualizar conta')
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
