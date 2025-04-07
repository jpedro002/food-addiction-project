import { IUsersService } from '@/services/appUsers/IUserService'
import { z } from 'zod'
import { useTabAccount } from './TabAccount.model'
import { EmailAndNameSchema } from './TabAccount.schema'

export type IEmailAndNameSchema = z.infer<typeof EmailAndNameSchema>

export type ITabAccountProps = ReturnType<typeof useTabAccount>

export interface IuseTabAccountProps {
	handleCloseModal: () => void
	usersService: IUsersService
}
