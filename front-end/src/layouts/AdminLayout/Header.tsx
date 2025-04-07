import { ReactNode } from 'react'

interface HeaderProps {
	children?: ReactNode
	title?: string
}

export const Header = ({ children, title }: HeaderProps) => {
	return (
		<header className="sticky top-0 z-10 flex min-h-[56.8px] max-h-[56.8px] items-center justify-between gap-1 border-b bg-background px-4">
			{children}
			{title && <h1 className="text-xl font-semibold">{title}</h1>}
		</header>
	)
}
