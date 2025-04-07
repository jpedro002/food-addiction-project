import { $Enums } from '@prisma/client';
import '@fastify/jwt'

declare module '@fastify/jwt' {
	export interface FastifyJWT {
		user: {
			role: $Enums.Role
			id: number
		}
	}
}
