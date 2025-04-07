import { setAppTitle } from '@/store/slices/appHeaderTitleSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useAppTitle = ({ title }: { title: string }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setAppTitle({ title }))
	}, [dispatch, title])
}
