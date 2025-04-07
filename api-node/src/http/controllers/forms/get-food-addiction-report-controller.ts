import { makeGetFoodAddictionReportUseCase } from '@/use-cases/forms/factory/make-get-food-addiction-report-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function GetFoodAddictionReportController(
	_request: FastifyRequest,
	reply: FastifyReply,
) {
	const getFoodAddictionReportUseCase = makeGetFoodAddictionReportUseCase()

	const data = await getFoodAddictionReportUseCase.execute()

	return reply.status(200).send({
		...data,
	})
}
