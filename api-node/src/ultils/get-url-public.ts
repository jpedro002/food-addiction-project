import { env } from '@/env'

export const getUrlPublic = (endPoint: string, HOSTNAME: string) => {
	if (env.NODE_ENV === 'development') {
		return `http://localhost:3000/public/${endPoint}`
	}

	return `https://${HOSTNAME}/public/${endPoint}`
}
