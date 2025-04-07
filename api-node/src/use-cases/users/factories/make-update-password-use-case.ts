import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdatePasswordUseCase } from '../update-password-use-case'

export function makeUpdatePasswordUseCase() {
	const userRepository = new PrismaUsersRepository()
	return new UpdatePasswordUseCase(userRepository)
}
