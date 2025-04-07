import { usersService } from '@/services/appUsers'
import { useCreateAccountModal } from './CreateAccountModal.model'
import { CreateAccountModalView } from './CreateAccountModal.view'

export const CreateAccountModal = () => {
	const props = useCreateAccountModal({
		usersService,
	})

	return (
		<>
			<CreateAccountModalView {...props} />
		</>
	)
}
