import axios, { AxiosError } from 'axios'

import { env } from '@/ENV'

const api = axios.create({
	baseURL: env.VITE_API_URL,
	withCredentials: true,
	maxContentLength: 100 * 1024 * 1024,
	maxBodyLength: 100 * 1024 * 1024,
})

api.interceptors.request.use(async (config) => {
	try {
		const jwt = localStorage.getItem('token')
		if (jwt) {
			config.headers.Authorization = `Bearer ${jwt}`
		}
		return config
	} catch (_error) {
		return config
	}
})

interface ErrorResponse {
	error: string
}

api.interceptors.response.use(
	null,
	async (error: AxiosError<ErrorResponse>) => {
		if (error?.response?.status === 403 || error?.response?.status === 401) {
			if (error.response.data.error === 'Unauthorized') {
				localStorage.removeItem('token')
				if (window.location.pathname !== '/auth') {
					window.location.reload()
				}
			}
		}
		if (error) throw error
	},
)

export { api }
