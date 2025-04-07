import { env } from '@/env'
import fastifyMultipart from '@fastify/multipart'
import dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

dotenv.config()

export default fp(async (fastify: FastifyInstance) => {
	console.log('Configuring multipart...')

	const maxFileSizeInBytes = env.MAX_FILE_SIZE_MB * 1024 * 1024

	fastify.register(fastifyMultipart, {
		limits: {
			fieldNameSize: 100,
			fieldSize: 1000000,
			fields: 10,
			fileSize: maxFileSizeInBytes,
			files: 1,
			headerPairs: 2000,
		},
		attachFieldsToBody: true,
	})
})
