import { FastifyTypedInstance } from '@/@types/fastifyTypedInstace'
import { z } from 'zod'
import { getUserController } from './get-user-controller'
import { loginController, loginSchema } from './login-controller'

export async function sessionRoutes(fastify: FastifyTypedInstance) {
	fastify.post('/session', {
		handler: loginController,
		schema: {
			tags: ['Session'],
			body: loginSchema,
			description: 'Login into the application',
			response: {
				200: z.object({
					token: z.string(),
				}),
			},
		},
	})

	fastify.get('/session', {
		preValidation: [fastify.authenticate],
		handler: getUserController,
		schema: {
			tags: ['Session'],
			description: 'Get user session',
			response: {
				200: z.object({
					id: z.number(),
					email: z.string(),
					role: z.string(),
					name: z.string(),
				}),
			},
		},
	})
}
