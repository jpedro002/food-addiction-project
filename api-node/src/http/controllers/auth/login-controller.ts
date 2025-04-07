import { makeLoginUseCase } from '@/use-cases/auth/make-login-use-case'
import { InvalidLoginCredancials } from '@/use-cases/errors/invalid-login-credencials'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export async function loginController(
	request: FastifyRequest<{ Body: { email: string; password: string } }>,
	reply: FastifyReply,
) {
	const { email, password } = loginSchema.parse(request.body)

	const loginUseCase = makeLoginUseCase()

	try {
		const { token } = await loginUseCase.execute({ email, password }, reply)
		return reply.send({ token })
	} catch (error) {
		console.error('Erro durante o login:', error)

		if (error instanceof InvalidLoginCredancials) {
			return reply.status(401).send({ message: error.message })
		}

		throw error
	}
}
