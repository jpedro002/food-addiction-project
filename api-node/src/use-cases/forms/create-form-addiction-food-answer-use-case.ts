import { FormAddictionFoodRepository } from '@/repositories/form-repository'

interface CreateFormAddictionFoodAnswerUseCaseRequest {
	userId: number
	q1?: number
	q2?: number
	q3?: number
	q4?: number
	q5?: number
	q6?: number
	q7?: number
	q8?: number
	q9?: number
	q10?: number
	q11?: number
	q12?: number
	q13?: number
	origem?: string
	identificadorPaciente?: string
}

interface CreateFormAddictionFoodAnswerUseCaseResponse {
	success: boolean
}

export class CreateFormAddictionFoodAnswerUseCase {
	constructor(private formRepository: FormAddictionFoodRepository) {}

	async execute(
		data: CreateFormAddictionFoodAnswerUseCaseRequest,
	): Promise<CreateFormAddictionFoodAnswerUseCaseResponse> {
		const { userId, ...formData } = data

		await this.formRepository.create({
			user: {
				connect: {
					id: userId,
				},
			},
			...formData,
		})

		return {
			success: true,
		}
	}
}
