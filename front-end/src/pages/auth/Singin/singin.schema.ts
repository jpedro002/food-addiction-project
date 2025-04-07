import { z } from 'zod'

export const singinSchema = z.object({
	email: z.string().email('E-mail inválido').min(4, 'E-mail inválido'),
	password: z.string().min(6, 'Campo obrigatório'),
})
