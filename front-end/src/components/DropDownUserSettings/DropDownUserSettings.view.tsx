import { Button } from '@/components/ui/button/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ModalEditUser } from '@/components/ModalEditUser'
import { User } from 'lucide-react'
import { IDropDownUserSettingsProps } from './DropDownUserSettings.types'

export const DropDownUserSettingsView = ({
	user,
	onLogout,
}: IDropDownUserSettingsProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" size="icon" className="rounded-full">
					{user?.picture ? (
						<img src={user.picture} className="rounded-full" />
					) : (
						<>
							<User className="h-5 w-5" />
							<span className="sr-only">Alternar menu do usuário</span>
						</>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{user?.name || 'Usuário'}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<ModalEditUser />
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onLogout}>Sair</DropdownMenuItem>
				{/* <Link to="/logout">
				</Link> */}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
