import { api } from '@/lib/axios'

import { IAuthRequest, IAuthResponse, ISession } from './types'

const SessionServices = {
	auth: async (payload: IAuthRequest) => {
		const { data } = await api.post<IAuthResponse>('/session', payload)
		return data
	},
	show: async () => {
		const { data } = await api.get<ISession>('/session')
		return data
	},
}

export { SessionServices }
