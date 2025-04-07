import { IUser } from '@/services/appUsers/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AppUsersState {
	users: IUser[]
	isLoading: boolean
}

const initialState: AppUsersState = {
	users: [],
	isLoading: false,
}

const appUsersSlice = createSlice({
	name: 'appUsers',
	initialState,
	reducers: {
		setLoadingState(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		startUsers(state, action: PayloadAction<IUser[]>) {
			state.users = action.payload
		},
		addUser(state, action: PayloadAction<IUser>) {
			state.users.push(action.payload)
		},
		deleteUserFromStore(state, action: PayloadAction<number>) {
			state.users = state.users.filter((user) => user.id !== action.payload)
		},
		updateUser(state, action: PayloadAction<IUser>) {
			const index = state.users.findIndex(
				(user) => user.id === action.payload.id,
			)
			if (index !== -1) {
				state.users[index] = action.payload
			}
		},
	},
})

export const {
	setLoadingState,
	addUser,
	deleteUserFromStore,
	updateUser,
	startUsers,
} = appUsersSlice.actions

export default appUsersSlice.reducer
