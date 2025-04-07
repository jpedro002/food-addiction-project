import { z } from 'zod'

export const filterUsersSchema = z.object({
	customerName: z.string().optional(),
	status: z.string().optional(),
})
