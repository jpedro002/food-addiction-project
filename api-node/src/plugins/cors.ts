import { env } from '@/env'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

dotenv.config()

export default fp(async (fastify: FastifyInstance) => {
	console.log('CORS_ORIGIN:', env.CORS_ORIGIN)

	const allowedOrigins = env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',') : []

	fastify.register(cors, {
		origin: (origin, cb) => {
			console.log('Received Origin:', origin)
			if (!origin || true) {
				cb(null, true)
			} else {
				cb(new Error('Not allowed by CORS'), false)
			}
		},
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	})
})
