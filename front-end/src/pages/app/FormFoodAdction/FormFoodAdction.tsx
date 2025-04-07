import { foodAddictionService } from '@/services/formAddictionFood'
import { useFormFoodAdctionModel } from './FormFoodAdction.model'
import { FormFoodAdctionView } from './FormFoodAdction.view'

export const FormFoodAdction = () => {
	const props = useFormFoodAdctionModel({
		foodAddictionService,
	})

	return <FormFoodAdctionView {...props} />
}
