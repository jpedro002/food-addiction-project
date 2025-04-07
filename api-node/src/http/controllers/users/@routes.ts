import { FastifyInstance } from 'fastify'

import { roleGuard } from '@/http/middleware/roleGuard'
import { Role } from '@prisma/client'
import { z } from 'zod'
import { CreateUserController } from './create-user-controller'
import { deleteUserController } from './delete-user-controller'
import { ListUsersController } from './list-users-controller'
import { resetPasswordController } from './reset-password-controller'
import { seftUpdateEmailAndNameController } from './seft-update-email-and-name-controller'
import { updatePasswordController } from './update-password-controller'
import { updateUserController } from './update-user-controller'

export async function userRoutes(fastify: FastifyInstance) {
	fastify.post('', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: CreateUserController,
		schema: {
			tags: ['Users'],
			description: 'Create a new user',
			body: z.object({
				name: z.string().min(1),
				email: z.string().email(),
				password: z.string().min(6),
				role: z.nativeEnum(Role),
			}),
			// response: {
			// 	201: z.object({
			// 		name: z.string(),
			// 		email: z.string().email().nullable(),
			// 		password: z.string().nullable(),
			// 		role: z.nativeEnum(Role),
			// 		picture: z.string().nullable(),
			// 		id: z.number(),
			// 		createdAt: z.date(),
			// 	}),
			// 	409: z.object({
			// 		message: z.string(),
			// 	}),
			// },
		},
	})

	fastify.get('/', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: ListUsersController,
		schema: {
			tags: ['Users'],
			description: 'Get users',
			params: z.object({
				status: z.nativeEnum(Role).optional(),
				customerName: z.string().optional(),
			}),
			response: {
				200: z.array(
					z.object({
						name: z.string(),
						email: z.string().email().nullable(),
						role: z.nativeEnum(Role),
						id: z.number(),
					}),
				),
			},
		},
	})

	fastify.delete('/:id', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: deleteUserController,
	})

	fastify.put('/:id', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: updateUserController,
	})

	fastify.patch('/resetPassword/:id', {
		preValidation: [fastify.authenticate, roleGuard(['ADMIN'])],
		handler: resetPasswordController,
	})

	fastify.put('/me/email-and-name', {
		preValidation: [fastify.authenticate],
		handler: seftUpdateEmailAndNameController,
	})

	fastify.put('/me/password', {
		preValidation: [fastify.authenticate],
		handler: updatePasswordController,
	})
}
