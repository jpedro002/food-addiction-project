import { Role } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'
import { processPictureFile } from '@/ultils/process-picture-file'
import { MultipartFile } from '@fastify/multipart'
import { notFoundError } from '../errors/not-found-error'

interface UpdateUserRequest {
	id: string
	name?: string
	email?: string
	role?: Role
}

export class UpdateUserUseCase {
	constructor(private userRepository: UsersRepository) {}

	async execute(data: UpdateUserRequest) {
		const user = await this.userRepository.findById(Number(data.id))

		if (!user) {
			throw new notFoundError()
		}

		let updatedData: Record<string, string | null> = {}

		if (data.email) updatedData.email = data.email.toLowerCase()
		if (data.name) updatedData.name = data.name.toLowerCase()
		if (data.role) updatedData.role = data.role

		const { createdAt, password, ...rest } =
			await this.userRepository.updateUser(Number(data.id), updatedData)

		return { ...rest }
	}
}
