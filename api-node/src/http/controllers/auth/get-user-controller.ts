import { makeGetUserUseCase } from '@/use-cases/auth/make-get-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getUserController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { id } = request.user

	const getUserUseCase = makeGetUserUseCase()

	const user = await getUserUseCase.execute({ id })

	return reply.send(user)
}
