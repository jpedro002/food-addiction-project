import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import appHeaderTitleSlice from './slices/appHeaderTitleSlice'
import appUsersSlice from './slices/appUsersSlice'

import counterSlice from './slices/counterSlice'

import { useDispatch } from 'react-redux'
import authSlice from './slices/authSlice'
import foodAddictionSlice from './slices/foodAddictionSlice'

export const store = configureStore({
	reducer: {
		counterSlice,
		appHeaderTitleSlice,
		appUsers: appUsersSlice,
		auth: authSlice,
		foodReport: foodAddictionSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
