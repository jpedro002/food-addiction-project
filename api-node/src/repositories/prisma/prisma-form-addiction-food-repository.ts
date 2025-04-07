import { Prisma, PrismaClient } from '@prisma/client'
import { FormAddictionFoodRepository } from '../form-repository'

export class PrismaFormAddictionFoodRepository
	implements FormAddictionFoodRepository
{
	constructor(private prisma: PrismaClient) {}

	async create(form: Prisma.FormFoodAdctionAnswerCreateInput): Promise<void> {
		await this.prisma.formFoodAdctionAnswer.create({
			data: form,
		})
	}
}
