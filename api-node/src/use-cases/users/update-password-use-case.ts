import { UsersRepository } from '@/repositories/users-repository'
import bcrypt from 'bcryptjs'
import { InvalidOldPasswordError } from '../errors/invalid-old-password-error'
import { notFoundError } from '../errors/not-found-error'

interface UpdatePasswordRequest {
	userId: number
	oldPassword: string
	newPassword: string
}

export class UpdatePasswordUseCase {
	constructor(private userRepository: UsersRepository) {}

	async execute({
		userId,
		oldPassword,
		newPassword,
	}: UpdatePasswordRequest): Promise<void> {
		const user = await this.userRepository.findById(userId)

		if (!user) {
			throw new notFoundError()
		}

		const isOldPasswordValid = await bcrypt.compare(
			oldPassword,
			user.password || '',
		)
		if (!isOldPasswordValid) {
			throw new InvalidOldPasswordError()
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 10)
		await this.userRepository.updateUserPassword(userId, hashedNewPassword)
	}
}
