import { UsersRepository } from '@/repositories/users-repository'
import bcrypt from 'bcryptjs'
import { notFoundError } from '../errors/not-found-error'

export class ResetPasswordUseCase {
	constructor(private userRepository: UsersRepository) {}

	async execute(userId: number): Promise<void> {
		const NEW_PASSWORD = '12345678'

		const user = await this.userRepository.findById(userId)

		if (!user) {
			throw new notFoundError()
		}

		const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10)

		await this.userRepository.updateUserPassword(userId, hashedPassword)
	}
}
