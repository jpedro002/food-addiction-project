import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { filterUsersSchema } from './FilterUsers.schema'
import { IFilterUsersSchema } from './FilterUsers.types'

export const useFilterUsers = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const { register, handleSubmit, control, reset } =
		useForm<IFilterUsersSchema>({
			resolver: zodResolver(filterUsersSchema),
			defaultValues: {
				customerName: customerName ?? '',
				status: status ?? 'all',
			},
		})

	function handleFilter({ customerName, status }: IFilterUsersSchema) {
		setSearchParams((state) => {
			if (customerName) {
				state.set('customerName', customerName.trim())
			} else {
				state.delete('customerName')
			}

			if (status) {
				state.set('status', status.trim())
			} else {
				state.delete('status')
			}

			return state
		})
	}

	function handleClearFilters() {
		setSearchParams((state) => {
			state.delete('customerName')
			state.delete('status')

			return state
		})

		reset({
			customerName: '',
			status: 'all',
		})
	}

	return {
		register,
		handleSubmit,
		control,
		handleFilter,
		handleClearFilters,
	}
}
