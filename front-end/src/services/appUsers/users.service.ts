import { api } from '@/lib/axios'
import {
	ICreateUser,
	IListUsers,
	ISelfUpdateEmailAndName,
	ISelfUpdatePassword,
	ISelfUpdatePasswordResponse,
	IUpdateUser,
	IUser,
} from './types'

import { IUsersService } from './IUserService'

export const usersService: IUsersService = {
	create: async (userData: ICreateUser) => {
		const { data } = await api.post<IUser>('/users', userData)
		return data
	},
	update: async (id: number, userData: IUpdateUser) => {
		const { data } = await api.put<IUser>(`/users/${id}`, userData)
		return data
	},
	delete: async (id: number) => {
		await api.delete(`/users/${id}`)
	},
	list: async ({ customerName, status }: IListUsers) => {
		const searchParams = new URLSearchParams()

		if (customerName) {
			searchParams.append('customerName', customerName)
		}
		if (status) {
			searchParams.append('status', status)
		}
		const { data } = await api.get<IUser[]>(`/users?${searchParams.toString()}`)
		return data
	},
	resetPassword: async (id: number) => {
		await api.patch(`/users/resetPassword/${id}`)
	},
	selfUpdateEmailAndName: async (userData: ISelfUpdateEmailAndName) => {
		await api.put('users/me/email-and-name', userData)
	},
	selfUpdatePassword: async (userData: ISelfUpdatePassword) => {
		const { data } = await api.put<ISelfUpdatePasswordResponse>(
			'/users/me/password',
			userData,
		)

		return data
	},
}
