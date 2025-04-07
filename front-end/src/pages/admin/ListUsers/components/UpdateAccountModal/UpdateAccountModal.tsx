import { usersService } from '@/services/appUsers'
import { useUpdateAccountModal } from './UpdateAccountModal.model'
import { IUpdateAccountModalViewModelProps } from './UpdateAccountModal.types'
import { UpdateAccountModalView } from './UpdateAccountModal.view'

export const UpdateAccountModal = ({
	defaultValues,
	userID,
}: IUpdateAccountModalViewModelProps) => {
	const props = useUpdateAccountModal({
		usersService: usersService,
		defaultValues,
		userID,
	})

	return <UpdateAccountModalView {...props} />
}
