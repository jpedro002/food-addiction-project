import { error } from 'console'
import { UsersRepository } from '@/repositories/users-repository'
import { z } from 'zod'

interface SeftUpdateEmailAndNameInput {
	id: number
	email?: string
	name?: string
}

export class SeftUpdateEmailAndNameUseCase {
	constructor(private userRepository: UsersRepository) {}

	async execute({
		email,
		id,
		name,
	}: SeftUpdateEmailAndNameInput): Promise<void> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new Error('Usuário não encontrado')
		}

		await this.userRepository.updateUser(id, { email, name })
	}
}
