import { FoodAddictionReportService } from '@/http/services/food-report/food-report-service'
import { GetFoodAddictionReportUseCase } from '../get-food-addiction-report-use-case'

export function makeGetFoodAddictionReportUseCase() {
	const foodAddictionReportService = new FoodAddictionReportService()

	return new GetFoodAddictionReportUseCase(foodAddictionReportService)
}
