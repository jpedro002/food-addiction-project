import { useAuth } from '@/hooks/useAuth/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { singinSchema } from './singin.schema'
import { singinSchemaType } from './singin.types'

export const useSingin = () => {
	const [passwordVisibility, setPasswordVisibility] = useState(false)

	const { login, refreshSession } = useAuth()

	const handleChangePasswordVisibility = () => {
		setPasswordVisibility((prev) => !prev)
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<singinSchemaType>({
		resolver: zodResolver(singinSchema),
	})

	const onSubmit = async (data: singinSchemaType) => {
		try {
			await login({
				email: data.email.trim().toLocaleLowerCase(),
				password: data.password,
			})

			refreshSession()

			toast.success('Bem-vindo(a)')
		} catch (_error) {
			toast.error('Credenciais inválidas')
		}
	}

	return {
		passwordVisibility,
		handleChangePasswordVisibility,
		register,
		handleSubmit,
		errors,
		isSubmitting,
		onSubmit,
	}
}
