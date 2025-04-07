import { IUsersService } from '@/services/appUsers/IUserService'
import { z } from 'zod'
import { updateUserSchema } from '../CreateAccountModal/CreateAccountModal.schema'
import { useUpdateAccountModal } from './UpdateAccountModal.model'

export type IUpdateUserSchema = z.infer<typeof updateUserSchema>

export type IUpdateAccountModalProps = ReturnType<typeof useUpdateAccountModal>

export interface IUseUpdateAccountModal {
	usersService: IUsersService
	defaultValues: {
		name: string
		email: string
		role: string
	}
	userID: number
}

export type IUpdateAccountModalViewModelProps = Omit<
	IUseUpdateAccountModal,
	'usersService'
>
