import { usersService } from "@/services/appUsers"
import { useListUsers } from "./ListUsers.model"
import { ListUsersView } from "./ListUsers.view"

export const ListUsers = () => {

	const props = useListUsers({
		usersService
	})

	return <ListUsersView {...props} />
}
