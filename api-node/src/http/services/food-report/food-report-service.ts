import { api } from '@/libs/axios'
import { IFoodAddictionReportService } from './food-report-contract'

export class FoodAddictionReportService implements IFoodAddictionReportService {
	async getFoodAddictionReport() {
		try {
			const response = await api.get('/food-adiction-report')
			return response.data
		} catch (error) {
			console.error(
				'Erro ao buscar o relatório de dependência alimentar:',
				error,
			)
			throw new Error(
				'Não foi possível obter o relatório de dependência alimentar.',
			)
		}
	}
}
