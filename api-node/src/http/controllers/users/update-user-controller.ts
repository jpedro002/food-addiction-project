import { notFoundError } from '@/use-cases/errors/not-found-error'
import { makeUpdateUserUseCase } from '@/use-cases/users/factories/make-update-user-use-case'
import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateUserController(
	request: FastifyRequest<{
		Params: { id: string }
	}>,
	reply: FastifyReply,
) {
	const updateUserSchema = z.object({
		email: z.string().email().optional(),
		name: z.string().optional(),
		role: z.nativeEnum(Role).optional(),
	})

	const { name, email, role } = updateUserSchema.parse(request.body)

	try {
		const updateUserUseCase = makeUpdateUserUseCase()
		const user = await updateUserUseCase.execute({
			id: request.params.id,
			name: name?.toLowerCase(),
			email: email?.toLowerCase(),
			role: role,
		})
		return reply.send(user)
	} catch (error) {
		if (error instanceof notFoundError) {
			return reply.status(404).send({ message: error.message })
		}
		throw error
	}
}
