import { makeSeftUpdateEmailAndNameUseCase } from '@/use-cases/users/factories/make-seft-update-email-and-name-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const schema = z.object({
	email: z.string().email().optional(),
	name: z.string().optional(),
})
export const seftUpdateEmailAndNameController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { email, name } = schema.parse(request.body)
	try {
		const { id } = request.user

		const useCase = makeSeftUpdateEmailAndNameUseCase()
		await useCase.execute({ id, email, name })

		return reply.status(204).send()
	} catch (error) {
		throw error
	}
}
