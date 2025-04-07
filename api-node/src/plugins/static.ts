import path from 'path'
import { OUTPUTS_PATH } from '@/constants/paths'
import fastifyStatic from '@fastify/static'
import dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

dotenv.config()

export default fp(async (fastify: FastifyInstance) => {
	console.log('Configuring static files...')

	console.log('Public directory:', OUTPUTS_PATH)

	fastify.register(fastifyStatic, {
		root: OUTPUTS_PATH,
		prefix: '/public/',
	})
})
