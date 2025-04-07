export const formateBirthDate = (date: string | Date) => {
	const d = new Date(date)
	const year = d.getFullYear()
	const month = d.getMonth() + 1
	const day = d.getDate()

	const getTwoDigits = (value: number) => {
		return value < 10 ? `0${value}` : value
	}

	return `${getTwoDigits(day) || '00'}/${getTwoDigits(month) || '00'}/${year || '0000'}`
}
