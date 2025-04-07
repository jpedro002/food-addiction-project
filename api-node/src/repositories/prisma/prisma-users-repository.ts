import { db } from '@/libs/prisma'
import { Prisma, Role, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
	async listUsers(filters: { customerName?: string; status?: Role }) {
		const { customerName, status } = filters

		return db.user.findMany({
			where: {
				role: {
					in: [Role.ADMIN, Role.HEALTHCARE_AGENT],
				},
				...(customerName && {
					name: {
						contains: customerName,
					},
				}),
				...(status && {
					role: {
						equals: status,
					},
				}),
			},
			orderBy: {
				createdAt: 'asc',
			},
		})
	}

	async findByEmail(email: string) {
		return db.user.findUnique({
			where: { email },
		})
	}

	async createUser(data: Prisma.UserCreateInput) {
		const user = await db.user.create({
			data,
		})

		return user
	}

	async findAll(): Promise<User[]> {
		const users = await db.user.findMany()
		return users
	}
	async findById(id: number): Promise<User | null> {
		const user = await db.user.findUnique({
			where: { id },
		})
		return user
	}

	async deleteById(id: number): Promise<void> {
		await db.user.delete({
			where: { id },
		})
	}

	async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
		const user = await db.user.update({
			where: { id },
			data,
		})

		return user
	}

	async updateUserPassword(id: number, password: string) {
		await db.user.update({
			where: { id },
			data: { password },
		})
	}
}
