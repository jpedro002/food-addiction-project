import { useFilterUsers } from './FilterUsers.model'
import { FilterUsersView } from './FilterUsers.view'

export const FilterUsers = () => {
	const props = useFilterUsers()
	return <FilterUsersView {...props} />
}
