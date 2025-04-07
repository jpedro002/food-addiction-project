import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { UsersTableRow } from '@/pages/admin/ListUsers/components/UsersTableRow/UsersTableRow'

import { Helmet } from 'react-helmet-async'

import { IListUserProps } from './ListUsers.types'
import { CreateAccountModal } from './components/CreateAccountModal/CreateAccountModal'
import { FilterUsers } from './components/FilterUsers/FilterUsers'

import { Skeleton } from '@/components/ui/skeleton'

export const ListUsersView = (props: IListUserProps) => {
	const { appUsers, loading } = props

	return (
		<>
			<Helmet title="Usuários" />

			<div className="space-y-6 mx-auto w-screen sm:w-full md:px-4 py-4 lg:px-8 md:max-w-5xl">
				<div className="px-4 md:px-0 space-y-6">
					<CreateAccountModal />
					<FilterUsers />
				</div>

				<div className="md:rounded-md md:border overflow-hidden">
					<Table className="min-w-[600px] mx-4 md:mx-0">
						<TableHeader>
							<TableRow className="md:bg-muted/50">
								<TableHead className="font-medium">Nome</TableHead>
								<TableHead className="font-medium">Email</TableHead>
								<TableHead className="font-medium">Cargo</TableHead>
								<TableHead className="font-medium text-right">Editar</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{loading
								? Array.from({ length: 15 }).map((_, index) => (
										<TableRow key={`skeleton-${index}`}>
											<TableCell>
												<Skeleton className="h-5 w-[120px]" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-5 w-[200px]" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-6 w-[80px] rounded-full" />
											</TableCell>
											<TableCell className="text-right">
												<Skeleton className="h-8 w-8 rounded-full ml-auto" />
											</TableCell>
										</TableRow>
									))
								: appUsers.map((user) => (
										<UsersTableRow
											key={user.id}
											id={user.id}
											email={user.email}
											name={user.name}
											cargo={user.role}
										/>
									))}

							{appUsers?.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center text-xs sm:text-sm"
									>
										Nenhum usuário encontrado
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
