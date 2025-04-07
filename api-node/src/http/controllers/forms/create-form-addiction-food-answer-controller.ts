import { makeCreateFormAddictionFoodAnswerUseCase } from '@/use-cases/forms/factory/make-create-form-addiction-food-answer-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const createFormAddictionFoodAnswerBodySchema = z.object({
	userId: z.number(),
	q1: z.number().int().min(0).max(7),
	q2: z.number().int().min(0).max(7),
	q3: z.number().int().min(0).max(7),
	q4: z.number().int().min(0).max(7),
	q5: z.number().int().min(0).max(7),
	q6: z.number().int().min(0).max(7),
	q7: z.number().int().min(0).max(7),
	q8: z.number().int().min(0).max(7),
	q9: z.number().int().min(0).max(7),
	q10: z.number().int().min(0).max(7),
	q11: z.number().int().min(0).max(7),
	q12: z.number().int().min(0).max(7),
	q13: z.number().int().min(0).max(7),
	origem: z.string().max(30),
	identificadorPaciente: z.string().max(30),
})

export type CreateFormAddictionFoodAnswerRequestBody = z.infer<
	typeof createFormAddictionFoodAnswerBodySchema
>

export async function CreateFormAddictionFoodAnswerController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const data = createFormAddictionFoodAnswerBodySchema.parse(request.body)

	const createFormAddictionFoodAnswerUseCase =
		makeCreateFormAddictionFoodAnswerUseCase()

	await createFormAddictionFoodAnswerUseCase.execute(data)

	return reply.status(201).send()
}
