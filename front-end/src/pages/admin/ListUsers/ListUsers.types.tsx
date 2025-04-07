import { IUsersService } from "@/services/appUsers/IUserService";
import { useListUsers } from "./ListUsers.model";

export type IListUserProps = ReturnType<typeof useListUsers>

export interface IUseListUsers {
	usersService: IUsersService
}
