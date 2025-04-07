import { PrismaFormAddictionFoodRepository } from '@/repositories/prisma/prisma-form-addiction-food-repository'
import { PrismaClient } from '@prisma/client'
import { CreateFormAddictionFoodAnswerUseCase } from '../create-form-addiction-food-answer-use-case'

export function makeCreateFormAddictionFoodAnswerUseCase() {
	const prisma = new PrismaClient()
	const formRepository = new PrismaFormAddictionFoodRepository(prisma)

	return new CreateFormAddictionFoodAnswerUseCase(formRepository)
}
