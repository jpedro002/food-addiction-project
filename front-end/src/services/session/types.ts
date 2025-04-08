export interface IAuthResponse {
	token: string
}

export interface IAuthRequest {
	email: string
	password: string
}

export type AccessLevel = 'HEALTHCARE_AGENT' | 'ADMIN'

export interface ISession {
	id: string
	name: string
	email: string
	picture: string | null
	role: AccessLevel
}

export interface AuthState {
	token: string | null
	session: ISession | null
	loading: boolean
}

export const defaultRouteToRole: Record<AccessLevel | 'NOT_LOGGED', string> = {
	HEALTHCARE_AGENT: '/',
	ADMIN: '/admin',
	NOT_LOGGED: '/auth',
}

export const ROLES_ARRAY: Array<AccessLevel> = ['ADMIN', 'HEALTHCARE_AGENT']
