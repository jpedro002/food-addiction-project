import { z } from 'zod'
import { useFilterUsers } from './FilterUsers.model'
import { filterUsersSchema } from './FilterUsers.schema'

export type IFilterUsersSchema = z.infer<typeof filterUsersSchema>

export type IFilterUsersProps = ReturnType<typeof useFilterUsers>
