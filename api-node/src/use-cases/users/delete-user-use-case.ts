import { UsersRepository } from '@/repositories/users-repository'

interface DeleteUserUseCaseRequest {
	id: number
}

export class DeleteUserUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
		await this.usersRepository.deleteById(id)
	}
}
