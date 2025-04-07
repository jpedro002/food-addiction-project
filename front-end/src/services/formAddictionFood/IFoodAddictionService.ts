import {
	CreateFoodAddictionForm,
	CreateFoodAddictionFormResponse,
	FoodAddictionReportResponse,
} from './types'

export interface IFoodAddictionService {
	getFoodAddictionReport(): Promise<FoodAddictionReportResponse>
	createFormAnswer(
		formData: CreateFoodAddictionForm,
	): Promise<CreateFoodAddictionFormResponse>
}
