import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '../update-user-use-case'

export function makeUpdateUserUseCase() {
	const userRepository = new PrismaUsersRepository()
	return new UpdateUserUseCase(userRepository)
}
