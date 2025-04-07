import { Prisma, Role, User } from '@prisma/client'

export type IFindUserById = Prisma.UserGetPayload<{
	select: { id: true; name: true; email: true; role: true; picture: true }
}>

export interface UsersRepository {
	findById: (id: number) => Promise<User | null>
	findByEmail: (email: string) => Promise<User | null>
	listUsers: (filters: {
		customerName?: string
		status?: Role
	}) => Promise<User[]>

	createUser: (data: Prisma.UserCreateInput) => Promise<User>
	deleteById: (id: number) => Promise<void>
	updateUser: (id: number, data: Prisma.UserUpdateInput) => Promise<User>
	updateUserPassword(id: number, password: string): Promise<void>
}
