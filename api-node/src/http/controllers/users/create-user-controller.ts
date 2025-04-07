import { processPictureFile } from '@/ultils/process-picture-file'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateUserUseCase } from '@/use-cases/users/factories/make-create-user-use-case'
import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const createUserBodySchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(6),
	role: z.nativeEnum(Role),
})

export type CreateUserRequestBody = z.infer<typeof createUserBodySchema>

export async function CreateUserController(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const { name, email, role, password } = createUserBodySchema.parse(
		request.body,
	)

	try {
		const createUserUseCase = makeCreateUserUseCase()

		const user = await createUserUseCase.execute({
			name: name.toLowerCase(),
			email: email.toLowerCase(),
			password: password,
			role: role,
		})

		return reply.status(201).send(user)
	} catch (err) {
		console.error(err)

		if (err instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: 'Usuário já existe.' })
		}

		throw err
	}
}
