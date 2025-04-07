import { ROLES_ARRAY } from '@/services/session/types'
import { useAppSelector } from '@/store'
import { addUser } from '@/store/slices/appUsersSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { createUserSchema } from './CreateAccountModal.schema'
import {
	ICreateUserSchema,
	IUseCreateAccountModal,
} from './CreateAccountModal.types'

export const useCreateAccountModal = ({
	usersService,
}: IUseCreateAccountModal) => {
	const [isOpen, setIsOpen] = useState(false)
	const [passwordVisibility, setPasswordVisibility] = useState({
		password: false,
		retypePassword: false,
	})

	const loading = useAppSelector((state) => state.appUsers.isLoading)

	const dispatch = useDispatch()

	const methods = useForm<ICreateUserSchema>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			email: '',
			name: '',
			password: '',
			retypePassword: '',
			role: '',
		},
	})

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors, isSubmitting },
	} = methods

	const togglePasswordVisibility = (
		passwordField: 'password' | 'retypePassword',
	) => {
		setPasswordVisibility((prev) => ({
			...prev,
			[passwordField]: !prev[passwordField],
		}))
	}

	const resetForm = () => {
		reset()
		setPasswordVisibility({
			password: false,
			retypePassword: false,
		})
	}

	const onSubmit = async (data: ICreateUserSchema) => {
		try {
			const { role, name, ...rest } = data

			const response = await usersService.create({
				...rest,
				email: data.email.trim().toLocaleLowerCase(),
				name: data.name.trim().toLowerCase(),
				role,
			})

			dispatch(addUser(response))
			resetForm()
			toast.success('Usuário criado com sucesso')
		} catch (error) {
			console.error(error)

			if (isAxiosError(error)) {
				toast.error(error.response?.data.message || 'Erro ao criar o usuário')
			}
		}
	}

	useEffect(() => {
		if (isOpen) {
			resetForm()
		}
	}, [isOpen, reset])

	return {
		isOpen,
		setIsOpen,
		loading,
		passwordVisibility,
		togglePasswordVisibility,
		register,
		control,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
		ROLES: ROLES_ARRAY,
		methods,
	}
}
