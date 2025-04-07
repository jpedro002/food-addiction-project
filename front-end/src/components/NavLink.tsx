import { cn } from '@/lib/utils'
import { Link, LinkProps, useLocation } from 'react-router-dom'

interface NavLinkProps extends LinkProps {}

export const NavLink = (LinkProps: NavLinkProps) => {
	const { pathname } = useLocation()

	const isCurrentRoute = pathname === LinkProps.to

	return (
		<Link
			{...LinkProps}
			to={LinkProps.to}
			className={cn(
				'text-muted-foreground hover:text-foreground data-[current=true]:text-foreground data-[current=true]:underline',
				LinkProps.className,
			)}
			data-current={isCurrentRoute}
		>
			{LinkProps.children}
		</Link>
	)
}
