import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
	title: string
}

const initialState: CounterState = {
	title: 'App Header Title',
}

export const appHeaderTitleSlice = createSlice({
	name: 'appHeaderTitle',
	initialState,
	reducers: {
		setAppTitle: (state, action: PayloadAction<{ title: string }>) => {
			state.title = action.payload.title
		},
	},
})

// Action creators are generated for each case reducer function
export const { setAppTitle } = appHeaderTitleSlice.actions

export default appHeaderTitleSlice.reducer
