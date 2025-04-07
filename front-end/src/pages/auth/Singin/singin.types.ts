import { z } from 'zod'
import { singinSchema } from './singin.schema'

export type singinSchemaType = z.infer<typeof singinSchema>
