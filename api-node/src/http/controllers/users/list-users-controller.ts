import { makeListUsersUseCase } from '@/use-cases/users/factories/make-list-users-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

interface ListUsersQuery {
	status?: string
	customerName?: string
}

export async function ListUsersController(
	request: FastifyRequest<{
		Querystring: ListUsersQuery
	}>,
	reply: FastifyReply,
) {
	try {
		const { customerName, status } = request.query

		const listUsersUseCase = makeListUsersUseCase()

		const users = await listUsersUseCase.execute({ customerName, status })

		return reply.send(users)
	} catch (error) {
		throw error
	}
}
