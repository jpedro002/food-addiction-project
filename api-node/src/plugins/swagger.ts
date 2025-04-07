import { env } from '@/env'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export default fp(async (fastify: FastifyInstance) => {
	fastify.register(swagger, {
		openapi: {
			info: {
				title: 'API Documentation',
				description: 'API documentation for your project',
				version: '1.0.0',
			},
			servers: [
				{
					url: 'http://localhost:3000',
					description: 'Local server',
				},
			],
			components: {
				securitySchemes: {
					ApiToken: {
						type: 'apiKey',
						name: 'Authorization',
						in: 'header',
						description: 'Authorization header token, sample: "Bearer #TOKEN#"',
					},
				},
			},
		},
		transform: jsonSchemaTransform,
	})

	if (env.NODE_ENV !== 'production') {
		fastify.register(swaggerUi, {
			routePrefix: '/docs',
			uiConfig: {
				docExpansion: 'full',
				deepLinking: false,
			},
			staticCSP: true,
			transformSpecificationClone: true,
		})
	}

	console.log('Swagger plugin registered')
})
