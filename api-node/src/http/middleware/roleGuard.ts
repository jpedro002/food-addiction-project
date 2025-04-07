import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

export function roleGuard(allowedRoles: Role[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const user = request.user

		const hasRole = allowedRoles.includes(user.role)

		if (!hasRole) {
			reply.status(403).send({ message: 'Forbidden' })
		}
	}
}
