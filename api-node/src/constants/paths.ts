import path from 'path'
import { env } from '@/env'

export const ROOT_PATH = process.cwd()
export const UPLOADS_PATH = path.join(ROOT_PATH, env.UPLOAD_DIR)
export const OUTPUTS_PATH = path.join(ROOT_PATH, env.PUBLIC_DIR)
