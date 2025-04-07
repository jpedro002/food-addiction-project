import { api } from '@/lib/axios'
import { IFoodAddictionService } from './IFoodAddictionService'
import {
	CreateFoodAddictionForm,
	CreateFoodAddictionFormResponse,
	FoodAddictionReportResponse,
} from './types'

export const foodAddictionService: IFoodAddictionService = {
	getFoodAddictionReport: async () => {
		const response = await api.get<FoodAddictionReportResponse>(
			'/forms/food-addiction-report',
		)
		return response.data
	},

	createFormAnswer: async (formData: CreateFoodAddictionForm) => {
		const response = await api.post<CreateFoodAddictionFormResponse>(
			'/forms/addiction-food-answer',
			formData,
		)
		return response.data
	},
}
