import { UsersRepository } from '@/repositories/users-repository'
import { isToday } from '@/ultils/dateUltils'
import { Role } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { FastifyReply } from 'fastify'
import { InvalidLoginCredancials } from '../errors/invalid-login-credencials'

interface LoginInput {
	email: string
	password: string
}

export interface JwtContent {
	id: number
	email: string
	role: Role
	teamID: number
}

export class LoginUseCase {
	constructor(private userRepository: UsersRepository) {}

	async execute(input: LoginInput, reply: FastifyReply) {
		const { email, password } = input

		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new InvalidLoginCredancials()
		}

		const isPasswordValid = await bcrypt.compare(password, user.password || '')

		if (!isPasswordValid) {
			throw new InvalidLoginCredancials()
		}

		const { id, role } = user

		const token = await reply.jwtSign(
			{ id, role },
			{
				expiresIn: '1d',
			},
		)

		return { token }
	}
}
