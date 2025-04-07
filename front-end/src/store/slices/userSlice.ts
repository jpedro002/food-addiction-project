import { api } from '@/lib/axios'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface UserState {
	id: number
	name: string
	email: string
	role: any | null
	isLoadingUser: boolean
	picture?: string | null
}

const initialState: UserState = {
	id: 0,
	name: '',
	email: '',
	role: null,
	isLoadingUser: true,
	picture: '',
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
	const response = await api.get('session')

	return response.data
})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			const { name, email, role, id, isLoadingUser } = action.payload

			state.name = name
			state.email = email
			state.role = role
			state.id = id
			state.isLoadingUser = isLoadingUser
		},
		setIsLoadingUser: (state, action: PayloadAction<boolean>) => {
			state.isLoadingUser = action.payload
		},
		clearUser: (_state) => {
			_state = initialState
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchUser.fulfilled,
			(
				state,
				action: PayloadAction<{
					id: number
					name: string
					email: string
					role: 'USER' | 'ADMIN'
					status?: boolean
					picture?: string | null
				}>,
			) => {
				const { name, email, role, id, picture } = action.payload

				state.name = name
				state.email = email
				state.role = role
				state.id = id
				state.picture = picture
			},
		)
	},
})

export const { setUser, clearUser, setIsLoadingUser } = userSlice.actions
export default userSlice.reducer
