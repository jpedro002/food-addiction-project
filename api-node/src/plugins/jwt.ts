import { env } from '@/env'
import fastifyJwt from '@fastify/jwt'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'

declare module 'fastify' {
	interface FastifyInstance {
		authenticate: (
			request: FastifyRequest,
			reply: FastifyReply,
		) => Promise<void>
	}
}

export default fp(async (fastify: FastifyInstance) => {
	fastify.register(fastifyJwt, {
		secret: env.JWT_SECRET 
	})

	fastify.decorate(
		'authenticate',
		async function (request: FastifyRequest, reply: FastifyReply) {
			try {
				await request.jwtVerify()
			} catch (err) {
				reply.send(err).code(401)
			}
		},
	)
})
