import { IUsersService } from '@/services/appUsers/IUserService'
import { z } from 'zod'
import { useCreateAccountModal } from './CreateAccountModal.model'
import { createUserSchema } from './CreateAccountModal.schema'

export type ICreateUserSchema = z.infer<typeof createUserSchema>

export type ICreateAccountModalProps = ReturnType<typeof useCreateAccountModal>

export interface IUseCreateAccountModal {
	usersService: IUsersService
}
