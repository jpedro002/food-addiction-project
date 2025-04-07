import { IFoodAddictionService } from '@/services/formAddictionFood'
import { useFormFoodAdctionModel } from './FormFoodAdction.model'

export type FormFoodAdctionViewProps = ReturnType<
	typeof useFormFoodAdctionModel
>

export interface useFormFoodAdctionModelProps {
	foodAddictionService: IFoodAddictionService
}

export type FrequencyOption = {
	label: string
	value: number
}

export type Question = {
	id: number
	text: string
}

export type QuestionnaireFormData = {
	patientId: string
	answers: Record<number, number>
}

export type ViewMode = 'steps' | 'all'
