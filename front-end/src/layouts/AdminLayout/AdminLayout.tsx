import { Outlet } from 'react-router-dom'

import { AdminAside } from '@/layouts/AdminLayout/AdminAside'
import { Header } from '@/layouts/AdminLayout/Header'
import { SheetAppMobile } from '@/layouts/AdminLayout/SheetAppMobile'

import { DropDownUserSettings } from '@/components/DropDownUserSettings/DropDownUserSettings'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/store'

export function AdminLayout() {
	const titleHeader = useAppSelector((state) => state.appHeaderTitleSlice.title)

	return (
		<div
			className={cn(
				'flex flex-col md:grid h-full min-h-screen w-full md:grid-cols-[min-content_1fr] md:items-start',
				titleHeader === 'questionário' && 'md:grid-cols-[1fr]',
			)}
		>
			{titleHeader !== 'questionário' && <AdminAside />}

			<div className="grid grid-rows-[min-content_1fr] min-h-full">
				<Header>
					{titleHeader !== 'questionário' ? <SheetAppMobile /> : null}
					<h1 className="text-xl font-semibold capitalize">{titleHeader}</h1>
					<div className="md:ml-auto">
						<DropDownUserSettings />
					</div>
				</Header>

				<Outlet />
			</div>
		</div>
	)
}
