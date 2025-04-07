import { usersService } from '@/services/appUsers/'
import { useDeleteAccountAlert } from './DeleteAccountAlert.model'
import { IDeleteAccountAlertViewModelProps } from './DeleteAccountAlert.types'
import { DeleteAccountAlertView } from './DeleteAccountAlert.view'

export const DeleteAccountAlert = ({
	userID,
}: IDeleteAccountAlertViewModelProps) => {
	const props = useDeleteAccountAlert({
		userID,
		usersService,
	})

	return <DeleteAccountAlertView {...props} />
}
