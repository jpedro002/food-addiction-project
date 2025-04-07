import { NavLink } from '@/components/NavLink'
import { Button } from '@/components/ui/button/button'
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { BrainCircuit, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const SheetApp = () => {
	const [isOpened, setIsOpened] = useState(false)

	const handleChangeOpen = () => {
		setIsOpened((prev) => !prev)
	}

	return (
		<Sheet onOpenChange={setIsOpened} open={isOpened}>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="shrink-0">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Alternar menu de navegação</span>
				</Button>
			</SheetTrigger>
			<SheetTitle hidden className="sr-only">
				Alternar menu de navegação
			</SheetTitle>
			<SheetContent side="left" aria-describedby={undefined}>
				<nav className="grid text-lg font-medium">
					<Link
						to="/"
						className="flex items-center gap-2 text-lg font-semibold"
					>
						<BrainCircuit className="h-6 w-6" />
						<span className="sr-only">Página Inicial de Previsões</span>
					</Link>
					<NavLink onClick={handleChangeOpen} to="/admin" className="mt-4">
						Admin
					</NavLink>

					<NavLink onClick={handleChangeOpen} to="/">
						app
					</NavLink>
				</nav>
			</SheetContent>
		</Sheet>
	)
}
