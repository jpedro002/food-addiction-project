import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SeftUpdateEmailAndNameUseCase } from '../seft-update-email-and-name-use-case'

export function makeSeftUpdateEmailAndNameUseCase() {
	const userRepository = new PrismaUsersRepository()
	return new SeftUpdateEmailAndNameUseCase(userRepository)
}
