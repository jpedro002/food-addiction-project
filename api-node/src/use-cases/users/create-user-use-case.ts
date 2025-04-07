import { UsersRepository } from '@/repositories/users-repository'

import { processPictureFile } from '@/ultils/process-picture-file'
import { MultipartFile } from '@fastify/multipart'
import { Role } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface CreateUserUseCaseRequest {
	name: string
	email: string
	password: string
	role: Role
}

interface CreateUserUseCaseResponse
	extends Omit<CreateUserUseCaseRequest, 'password'> {
	id: number
}

export class CreateUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(
		data: CreateUserUseCaseRequest,
	): Promise<CreateUserUseCaseResponse> {
		const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

		if (userAlreadyExists) {
			throw new UserAlreadyExistsError()
		}

		const hashedPassword = await hash(data.password, 10)

		const user = await this.usersRepository.createUser({
			email: data.email.toLowerCase(),
			name: data.name.toLowerCase(),
			password: hashedPassword,
			role: data.role,
		})

		const { password, createdAt, ...userWithoutPassword } = user

		return { ...userWithoutPassword }
	}
}
