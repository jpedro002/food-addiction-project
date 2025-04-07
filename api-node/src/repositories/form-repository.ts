import { Prisma } from '@prisma/client'

export interface FormAddictionFoodRepository {
	create: (form: Prisma.FormFoodAdctionAnswerCreateInput) => Promise<void>
}
