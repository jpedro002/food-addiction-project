import Fastify from 'fastify'
import {
	ZodTypeProvider,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

import { env } from './env'

import corsConfig from './plugins/cors'
import jwtPlugin from './plugins/jwt'
import multpart from './plugins/multpart'
import staticPlugin from './plugins/static'
import swagger from './plugins/swagger'

import { sessionRoutes } from './http/controllers/auth/@routes'
import { formRoutes } from './http/controllers/forms/@routes'
import { userRoutes } from './http/controllers/users/@routes'
import { delay } from './ultils/delay'

export const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

app.get('/ping', async (_, reply) => {
	return reply.send({ ping: 'pong' }).code(200)
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(swagger)

app.register(corsConfig)

app.register(jwtPlugin)

app.register(multpart)

app.register(staticPlugin)

app.register(sessionRoutes)

app.register(userRoutes, { prefix: '/users' })

app.register(formRoutes, { prefix: '/forms' })

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation error.', issues: error.format() })
	}

	if (error.statusCode === 401) {
		return reply.status(401).send({ ...error, error: 'Unauthorized' })
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error)
		return reply
			.status(500)
			.send({ message: 'Internal server error.', details: error.message })
	} else {
		// TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
	}

	return reply.status(500).send({ message: 'Internal server error.' })
})

// if (env.NODE_ENV === 'development') {
// 	app.addHook('onRequest', async () => {
// 		await delay(2000)
// 	})
// }
