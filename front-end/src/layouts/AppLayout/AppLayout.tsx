import { Outlet } from 'react-router-dom'

import { Header } from './Header'

export const AppLayout = () => {
	return (
		<div
			className="grid h-full min-h-screen grid-rows-[min-content_1fr]
		 items-start  "
		>
			<Header />
			<Outlet />
		</div>
	)
}
