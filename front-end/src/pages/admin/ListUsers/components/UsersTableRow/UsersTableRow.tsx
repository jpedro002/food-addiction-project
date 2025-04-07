import { Button } from '@/components/ui/button/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { TableCell, TableRow } from '@/components/ui/table'

import { Ellipsis } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { DeleteAccountAlert } from '../DeleteAccountAlert/DeleteAccountAlert'
import { UpdateAccountModal } from '../UpdateAccountModal/UpdateAccountModal'

interface UsersTableRowProps {
	id: number
	name: string
	email: string
	cargo: string
}

export const UsersTableRow = ({
	id,
	name,
	email,
	cargo,
}: UsersTableRowProps) => {
	return (
		<TableRow key={id} className="hover:bg-muted/50">
			<TableCell className=" font-medium">{name}</TableCell>
			<TableCell>{email}</TableCell>
			<TableCell>
				<Badge
					variant="outline"
					className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
				>
					{cargo}
				</Badge>
			</TableCell>
			<TableCell className="text-right">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" className="size-10 p-2">
							<Ellipsis />
						</Button>
					</PopoverTrigger>
					<PopoverContent align="end" className="w-[200px]">
						<UpdateAccountModal
							defaultValues={{
								name,
								email,
								role: cargo,
							}}
							userID={id}
						/>
						<DeleteAccountAlert userID={id} />
					</PopoverContent>
				</Popover>
			</TableCell>
		</TableRow>
	)
}
