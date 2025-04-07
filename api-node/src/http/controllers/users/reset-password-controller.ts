import { notFoundError } from '@/use-cases/errors/not-found-error'
import { makeResetPasswordUseCase } from '@/use-cases/users/factories/make-reset-password-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function resetPasswordController(
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply,
) {
	const { id } = request.params
	const resetPasswordUseCase = makeResetPasswordUseCase()

	try {
		await resetPasswordUseCase.execute(parseInt(id, 10))
		return reply.status(204).send()
	} catch (error) {
		if (error instanceof notFoundError) {
			return reply.status(404).send({ message: error.message })
		}

		throw error
	}
}
