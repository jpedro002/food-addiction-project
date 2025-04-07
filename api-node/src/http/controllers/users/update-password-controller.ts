import { InvalidOldPasswordError } from '@/use-cases/errors/invalid-old-password-error'
import { notFoundError } from '@/use-cases/errors/not-found-error'
import { makeUpdatePasswordUseCase } from '@/use-cases/users/factories/make-update-password-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const updatePasswordSchema = z.object({
	oldPassword: z.string(),
	newPassword: z
		.string()
		.min(6, 'A nova senha deve ter pelo menos 6 caracteres'),
})

export async function updatePasswordController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = request.user

	const { oldPassword, newPassword } = updatePasswordSchema.parse(request.body)

	try {
		const updatePasswordUseCase = makeUpdatePasswordUseCase()
		await updatePasswordUseCase.execute({
			userId: id,
			oldPassword,
			newPassword,
		})

		return reply.status(200).send({ message: 'Senha atualizada com sucesso' })
	} catch (error) {
		if (error instanceof notFoundError) {
			return reply.status(400).send({ message: error.message })
		}
		if (error instanceof InvalidOldPasswordError) {
			return reply.status(400).send({ message: error.message })
		}

		throw error
	}
}
