import { UsersRepository } from '@/repositories/users-repository'
import { Role } from '@prisma/client'

interface ListUsersRequest {
	customerName?: string
	status?: string
}

interface ListUsersResponse {
	id: number
	email: string | null
	role: Role
	name: string
}

export class ListUsersUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		customerName,
		status,
	}: ListUsersRequest): Promise<ListUsersResponse[]> {
		const users = await this.usersRepository.listUsers({
			customerName,
			status: status as Role,
		})

		return users.map((user) => {
			const { id, email, role, name } = user

			return {
				id,
				email,
				role,
				name,
			}
		})
	}
}
