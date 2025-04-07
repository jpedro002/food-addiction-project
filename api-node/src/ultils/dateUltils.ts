export function isToday(date: Date): boolean {
	const today = new Date().toISOString().split('T')[0]
	const targetDate = date.toISOString().split('T')[0]
	return targetDate === today
}
