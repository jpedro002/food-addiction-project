import { IUsersService } from '@/services/appUsers/IUserService'
import { useDeleteAccountAlert } from './DeleteAccountAlert.model'

export type IUseDeleteAccountAlert = {
	userID: number
	usersService: IUsersService
}

export type IDeleteAccountAlertProps = ReturnType<typeof useDeleteAccountAlert>

export type IDeleteAccountAlertViewModelProps = {
	userID: number
}
