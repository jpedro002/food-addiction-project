import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
	JWT_SECRET: z.string(),
	CORS_ORIGIN: z.string(),
	DATABASE_URL: z.string().url(),
	FIRST_ADMIN_PASSWORD: z.string(),
	PUBLIC_DIR: z.string().default('/src/outputs'),
	UPLOAD_DIR: z.string().default('/src/uploads'),
	PORT: z.coerce.number().default(3000),
	MAX_FILE_SIZE_MB: z.coerce.number().default(10),
	PY_API_URL: z.string().default('http://python:5000'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('❌ Invalid environment variables', _env.error.format())

	throw new Error('Invalid environment variables.')
}

export const env = _env.data
