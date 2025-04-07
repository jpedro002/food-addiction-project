import { SingInView } from './Singin.view'
import { useSingin } from './singin.model'

export const SingIn = () => {
	const singinModel = useSingin()

	return (
		<>
			<SingInView {...singinModel} />
		</>
	)
}
