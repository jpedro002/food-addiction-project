import { ISelfUpdateEmailAndName } from '@/services/appUsers/types'
import { SessionServices } from '@/services/session'
import { AuthState, IAuthRequest } from '@/services/session/types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: AuthState = {
	token: localStorage.getItem('token'),
	session: null,
	loading: !!localStorage.getItem('token'),
}

export const login = createAsyncThunk(
	'auth/login',
	async (payload: IAuthRequest) => {
		const { token } = await SessionServices.auth(payload)
		localStorage.setItem('token', token)
		return token
	},
)

export const refreshSessionThunk = createAsyncThunk(
	'auth/refreshSession',
	async () => {
		const session = await SessionServices.show()
		return session
	},
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateEmailAndName: (
			state,
			action: PayloadAction<ISelfUpdateEmailAndName>,
		) => {
			const { email, name } = action.payload

			if (state.session && email && name) {
				state.session.email = email
				state.session.name = name
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(login.pending, (state) => {
				state.loading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.token = action.payload
				state.loading = false
			})
			.addCase(login.rejected, (state, a) => {
				a.error
				state.token = null
				state.loading = false
				throw new Error('Login failed')
			})
			// Refresh Session
			.addCase(refreshSessionThunk.pending, (state) => {
				state.loading = true
			})
			.addCase(refreshSessionThunk.fulfilled, (state, action) => {
				state.session = action.payload
				state.loading = false
			})
			.addCase(refreshSessionThunk.rejected, (state) => {
				state.session = null
				state.loading = false
			})
	},
})

export const { updateEmailAndName } = authSlice.actions

export default authSlice.reducer
