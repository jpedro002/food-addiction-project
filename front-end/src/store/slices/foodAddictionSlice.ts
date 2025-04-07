import { FoodAddictionReport } from '@/services/formAddictionFood/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface FoodAddictionState {
	report: FoodAddictionReport | null
	loading: boolean
	error: string | null
	currentQuestion: string
}

const initialState: FoodAddictionState = {
	report: null,
	loading: true,
	error: null,
	currentQuestion: 'q1',
}

const foodAddictionSlice = createSlice({
	name: 'foodAddiction',
	initialState,
	reducers: {
		fetchReportStart: (state) => {
			state.loading = true
			state.error = null
		},
		fetchReportSuccess: (state, action: PayloadAction<FoodAddictionReport>) => {
			state.report = action.payload
			state.loading = false
			state.error = null
		},
		fetchReportFailure: (state, action: PayloadAction<string>) => {
			state.loading = false
			state.error = action.payload
		},
		setCurrentQuestion: (state, action: PayloadAction<string>) => {
			state.currentQuestion = action.payload
		},
	},
})

export const {
	fetchReportStart,
	fetchReportSuccess,
	fetchReportFailure,
	setCurrentQuestion,
} = foodAddictionSlice.actions

export default foodAddictionSlice.reducer
