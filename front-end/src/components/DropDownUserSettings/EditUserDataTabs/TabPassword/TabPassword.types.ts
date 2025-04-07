import { IUsersService } from '@/services/appUsers/IUserService'
import { z } from 'zod'
import { useTabPassword } from './TabPassword.model'
import { selfUpdatePasswordSchema } from './TabPassword.schema'

export type ISelfUpdatePasswordSchema = z.infer<typeof selfUpdatePasswordSchema>

export type ITabPasswordProps = ReturnType<typeof useTabPassword>

export interface IUseTabPasswordProps {
	handleCloseModal: () => void
	usersService: IUsersService
}
