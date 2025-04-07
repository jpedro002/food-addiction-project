import { UsersRepository } from '@/repositories/users-repository'
import { Role } from '@prisma/client'
import { notFoundError } from '../errors/not-found-error'

interface GetUserUseCaseRequest {
	id: number
}

interface GetUserUseCaseResponse {
	id: number
	email: string
	role: Role
	name: string
}

export class GetUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		id,
	}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
		const user = await this.usersRepository.findById(id)

		if (!user) {
			throw new notFoundError()
		}

		const { email, role, name } = user

		return {
			id,
			email,
			role,
			name,
		}
	}
}
