import {
	ICreateUser,
	IListUsers,
	ISelfUpdateEmailAndName,
	ISelfUpdatePassword,
	ISelfUpdatePasswordResponse,
	IUpdateUser,
	IUser,
} from './types'

export interface IUsersService {
	create(userData: ICreateUser): Promise<IUser>
	update(id: number, userData: IUpdateUser): Promise<IUser>
	delete(id: number): Promise<void>
	list(filters: IListUsers): Promise<IUser[]>
	resetPassword(id: number): Promise<void>
	selfUpdateEmailAndName(userData: ISelfUpdateEmailAndName): Promise<void>
	selfUpdatePassword(
		userData: ISelfUpdatePassword,
	): Promise<ISelfUpdatePasswordResponse>
}
