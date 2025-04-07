import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '../create-user-use-case'

export function makeCreateUserUseCase() {
	const usersRepository = new PrismaUsersRepository()

	return new CreateUserUseCase(usersRepository)
}
