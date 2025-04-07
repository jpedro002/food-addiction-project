import { makeDeleteUserUseCase } from '@/use-cases/users/factories/make-delete-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteUserController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const deleteUserSchema = z.object({
		id: z.string(),
	})

	const { id } = deleteUserSchema.parse(request.params)

	const deleteUserUseCase = makeDeleteUserUseCase()

	await deleteUserUseCase.execute({ id: Number.parseInt(id) })

	return reply.status(204).send()
}
