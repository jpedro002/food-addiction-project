import { roleGuard } from '@/http/middleware/roleGuard'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { CreateFormAddictionFoodAnswerController } from './create-form-addiction-food-answer-controller'
import { GetFoodAddictionReportController } from './get-food-addiction-report-controller'

export async function formRoutes(fastify: FastifyInstance) {
	fastify.post('/addiction-food-answer', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: CreateFormAddictionFoodAnswerController,
		schema: {
			tags: ['Forms'],
			description: 'create form addiction food answer',
		},
	})

	fastify.get('/food-addiction-report', {
		preValidation: [
			fastify.authenticate,
			roleGuard(['ADMIN', 'HEALTHCARE_AGENT']),
		],
		handler: GetFoodAddictionReportController,
		schema: {
			tags: ['Reports'],
			description: 'Get food addiction evaluation report',
		},
	})
}
