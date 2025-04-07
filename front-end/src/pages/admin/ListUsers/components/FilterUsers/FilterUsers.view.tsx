import { Search, X } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { ROLES_ARRAY } from '@/services/session/types'
import { IFilterUsersProps } from './FilterUsers.types'

export function FilterUsersView(props: IFilterUsersProps) {
	const { control, handleClearFilters, handleSubmit, handleFilter, register } =
		props

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="flex flex-wrap items-center gap-2"
		>
			<span className="text-sm font-semibold">Filtros:</span>
			<Input
				placeholder="Nome do cliente"
				className="h-8 w-[320px]"
				{...register('customerName')}
			/>
			<Controller
				name="status"
				control={control}
				render={({ field: { name, onChange, value, disabled } }) => {
					return (
						<Select
							defaultValue="all"
							name={name}
							onValueChange={onChange}
							value={value}
							disabled={disabled}
						>
							<SelectTrigger className="h-8 w-[180px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todos os Status</SelectItem>
								{ROLES_ARRAY.map((role) => (
									<SelectItem key={role} value={role}>
										{role.toLowerCase()}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)
				}}
			/>
			<Button variant="secondary" size="xs" type="submit">
				<Search className="mr-2 h-4 w-4" />
				Filtrar resultados
			</Button>
			<Button
				onClick={handleClearFilters}
				variant="outline"
				size="xs"
				type="button"
			>
				<X className="mr-2 h-4 w-4" />
				Remover filtros
			</Button>
		</form>
	)
}
