import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { LoginUseCase } from './login-use-case'

export function makeLoginUseCase() {
	const userRepository = new PrismaUsersRepository()
	return new LoginUseCase(userRepository)
}
