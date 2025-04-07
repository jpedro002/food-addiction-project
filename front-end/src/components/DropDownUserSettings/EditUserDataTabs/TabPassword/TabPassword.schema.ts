import { z } from 'zod'

export const selfUpdatePasswordSchema = z.object({
	currentPassword: z.string().min(1, 'A senha atual é obrigatória'),
	newPassword: z
		.string()
		.min(6, 'A nova senha deve ter pelo menos 6 caracteres'),
})
