import { z } from 'zod'

export const EmailAndNameSchema = z.object({
	name: z.string().min(1, 'O nome é obrigatório'),
	email: z.string().email('Endereço de e-mail inválido'),
})
