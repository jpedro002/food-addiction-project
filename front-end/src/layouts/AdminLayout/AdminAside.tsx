import { AppWindow, AreaChart, ShieldMinus, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button/button'
import { TooltipProvider } from '@/components/ui/tooltip'

import { CustomToolTip } from './CustomToolTip'

export const AdminAside = () => {
	return (
		<TooltipProvider>
			<aside className=" hidden md:flex h-full flex-col border-r">
				<div className="sticky top-0">
					<div className="border-b p-2 min-h-[56.8px] max-h-[56.8px]">
						<Button variant="outline" size="icon" aria-label="Home">
							<Triangle className="size-5 fill-foreground" />
						</Button>
					</div>
					<nav className="grid gap-1 p-2">
						<CustomToolTip
							to="/admin"
							icon={<ShieldMinus className="size-5" />}
							label="Admin"
						/>
						<CustomToolTip
							to="/admin/dashboard"
							icon={<AreaChart className="size-5" />}
							label="Dashboard lesão por pressão"
						/>
						<CustomToolTip
							to="/"
							icon={<AppWindow className="size-5" />}
							label="App"
						/>
					</nav>
				</div>
			</aside>
		</TooltipProvider>
	)
}
