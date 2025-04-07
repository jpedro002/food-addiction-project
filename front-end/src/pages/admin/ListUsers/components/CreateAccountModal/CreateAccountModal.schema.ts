import { z } from 'zod'

const baseSchema = z.object({
	name: z.string().min(1, 'O nome é obrigatório'),
	email: z.string().email('Formato de e-mail inválido'),
	password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
	retypePassword: z.string().min(6, 'As senhas devem ser iguais'),
	role: z.string().min(1, 'Campo obrigatório'),
})

const createUserSchema = baseSchema.refine(
	(data) => data.password === data.retypePassword,
	{
		message: 'As senhas não coincidem',
		path: ['retypePassword'],
	},
)

const updateUserSchema = baseSchema.omit({
	password: true,
	retypePassword: true,
})

export { createUserSchema, updateUserSchema }
