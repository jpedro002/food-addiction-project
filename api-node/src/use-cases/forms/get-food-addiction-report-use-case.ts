import { IFoodAddictionReportService } from '@/http/services/food-report/food-report-contract'

export class GetFoodAddictionReportUseCase {
	constructor(
		private foodAddictionReportService: IFoodAddictionReportService,
	) {}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async execute(): Promise<any> {
		const reportData =
			await this.foodAddictionReportService.getFoodAddictionReport()

		return {
			data: reportData,
		}
	}
}
