import { HTMLAttributes } from 'react'

type SpinnerLoadingProps = HTMLAttributes<HTMLDivElement>
export const SpinnerLoading = ({
	className,
	...props
}: SpinnerLoadingProps) => {
	return (
		<div
			className={`size-5 border-2 border-blue-500 border-solid
		rounded-full border-t-transparent animate-spin ${className}`}
			{...props}
		/>
	)
}
