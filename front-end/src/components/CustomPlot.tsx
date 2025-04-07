import { cn } from '@/lib/utils'
import Plot from 'react-plotly.js'

interface CustomPlotProps {
	data: any
	layout: any
	frames?: any
	plotH?: string
	divH?: string
}

export const CustomPlot = ({
	data,
	layout,
	frames,
	plotH,
	divH,
}: CustomPlotProps) => {
	const responsiveLayout = {
		...layout,
		autosize: true,
		width: undefined,
		height: undefined,
	}

	return (
		<div
			className={cn('min-w-[600px] w-full max-w-full overflow-x-auto', divH)}
		>
			<Plot
				frames={frames}
				data={data}
				layout={responsiveLayout}
				useResizeHandler
				style={{ width: '100%', height: '100%' }}
				className={cn('h-[500px]', plotH)}
			/>
		</div>
	)
}
